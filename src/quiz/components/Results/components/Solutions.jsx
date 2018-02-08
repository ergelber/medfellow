import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid, Row, Button, Col } from 'react-bootstrap';

import { getQuestions, getLongExplanation,
  hasLongExplanation as hasLongExplanationSelector,
  hasPassages as hasPassagesSelector,
  getPassages, getQuizType
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
      <div className='passage-solution-container'>
        <Passage solution={true} passages={passages} />
      </div>
        <div className='passage-questions-container'>
          <div className='results-header-container'>
            <div className='results-header'>
              Good work! Score: {this.getNumCorrect()} / {questions.length}
            </div>
            <div className='results-header-button-group'>
              <Button onClick={this.startQuiz}>New Quiz</Button>
              <Button onClick={() => history.push('/')}>Dashboard</Button>
            </div>
          </div>
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
            <Col xs={12} md={6}>
              <Solution key={`solution-${+i - 1}`}
                question={questions[+i - 1]} 
                showLongExplanation={showLongExplanation} 
                longExplanation={longExplanation}
                history={history}
                match={match}
                startQuiz={this.startQuiz} />
            </Col>
            <Col xs={12} md={6}>
              <Solution key={`solution-${i}`}
                question={question}
                showLongExplanation={showLongExplanation}
                longExplanation={longExplanation}
                history={history}
                match={match}
                startQuiz={this.startQuiz} />
            </Col>
          </Row>
        );
        return acc;
      }
      if (+i === questions.length - 1 && +i % 2 === 0) {
        acc.push(
          <Row className="show-grid" key={`solution-row-${i}`}>
            <Col xs={12} md={6} className='solution-container'>
              <Solution key={`solution-${i}`}
                question={question}
                showLongExplanation={showLongExplanation}
                longExplanation={longExplanation}
                history={history}
                match={match}
                startQuiz={this.startQuiz} />
            </Col>
          </Row>
        );
        return acc;
      }
      return acc;
    }, []);
  }

  render() {
    const { hasLongExplanation, questions, quizType,
      question, hideLongExplanation, history
    } = this.props;

    return (
      <Grid fluid={true}>
        { quizType === 'discrete' ?
          <div className='results-header-discrete-container'>
            <div className='results-header'>
              Good work! Score: {this.getNumCorrect()} / {questions.length}
            </div>
            <div className='results-header-button-group'>
              <Button onClick={this.startQuiz}>New Quiz</Button>
              <Button onClick={() => history.push('/')}>Dashboard</Button>
            </div>
          </div> : null }
        { quizType === 'passage' ? this.passageSolutions() : this.mapSolutions() }
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
  quizType: getQuizType(state)
});

const SolutionsContainer = connect(mapStateToProps, {
  showLongExplanation,
  hideLongExplanation
})(Solutions);

export default SolutionsContainer;