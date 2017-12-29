import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid, Row, Button, Col } from 'react-bootstrap';

import { getQuestions, getLongExplanation,
  hasLongExplanation as hasLongExplanationSelector,
  hasPassages as hasPassagesSelector,
  getPassages
} from '../../../selector.js';
import Solution from './Solution';
import LongExplanation from './LongExplanation';
import { showLongExplanation, hideLongExplanation } from '../actions';
import { Passage } from '../../Quiz';

import './Solutions.css';


class Solutions extends Component {
  constructor(props) {
    super(props);

    this.mapSolutions = this.mapSolutions.bind(this);
    this.getNumCorrect = this.getNumCorrect.bind(this);
    this.passageSolutions = this.passageSolutions.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
  }

  getNumCorrect() {
    const { questions } = this.props;
    return _.reduce(questions, (acc, question) =>{
      if(question.answer === question.userChoice) acc++;
      return acc;
    }, 0);
  }

  startQuiz() {
    const { history, match } = this.props;
    history.push(`/quiz/${match.params.section}`);
  }

  passageSolutions() {
    const { passages, questions, showLongExplanation, longExplanation,
      history, match } = this.props;
    return (
      <div>
        <Col sm={12} md={6}>
          <div className='passage-solution-container'>
            <Passage passages={passages} />
          </div>
        </Col>
          { _.map(questions, (question, i) => (
            <Solution key={`solution-${i}`}
              question={question}
              showLongExplanation={showLongExplanation}
              longExplanation={longExplanation}
              history={history}
              match={match}
              startQuiz={this.startQuiz} />
          ))}
      </div>
    );
  }

  mapSolutions() {
    const { questions, showLongExplanation, longExplanation,
      history, match } = this.props;

    return _.reduce(questions, (acc, question, i) => {
      if (i !== 0 && +i % 2 === 1) {
        acc.push(
          <Row className="show-grid" key={`solution-row-${i}`}>
            <Solution key={`solution-${+i - 1}`}
              question={questions[+i - 1]} 
              showLongExplanation={showLongExplanation} 
              longExplanation={longExplanation}
              history={history}
              match={match}
              startQuiz={this.startQuiz} />
            <Solution key={`solution-${i}`}
              question={question}
              showLongExplanation={showLongExplanation}
              longExplanation={longExplanation}
              history={history}
              match={match}
              startQuiz={this.startQuiz} />
          </Row>
        );
        return acc;
      }
      if (+i === questions.length - 1 && +i % 2 === 0) {
        acc.push(
          <Row className="show-grid" key={`solution-row-${i}`}>
            <Solution key={`solution-${i}`}
              question={question}
              showLongExplanation={showLongExplanation}
              longExplanation={longExplanation}
              history={history}
              match={match}
              startQuiz={this.startQuiz} />
          </Row>
        );
        return acc;
      }
      return acc;
    }, []);
  }

  render() {
    const { hasLongExplanation, questions,
      question, hideLongExplanation 
    } = this.props;

    return (
      <Grid fluid={true}>
        <div className='results-header-container'>
          <div className='results-header'>
            Good work! Score: {this.getNumCorrect()} / {questions.length}
          </div>
          <Button onClick={this.startQuiz}>New Quiz</Button>
        </div>
        { true ? this.passageSolutions() : this.mapSolutions() }
        { hasLongExplanation ? 
          <LongExplanation 
            onHide={hideLongExplanation}
            show={hasLongExplanation} 
            question={question} /> : null }
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: getQuestions(state),
  hasLongExplanation: hasLongExplanationSelector(state),
  question: getLongExplanation(state),
  hasPassages: hasPassagesSelector(state),
  passages: getPassages(state),
});

const SolutionsContainer = connect(mapStateToProps, {
  showLongExplanation,
  hideLongExplanation
})(Solutions);

export default SolutionsContainer;