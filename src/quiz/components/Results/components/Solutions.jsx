import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Grid, Row, Button } from 'react-bootstrap';

import { getQuestions, getLongExplanation,
  hasLongExplanation as hasLongExplanationSelector
} from '../../../selector.js';
import Solution from './Solution';
import LongExplanation from './LongExplanation';
import { showLongExplanation, hideLongExplanation } from '../actions';

import './Solutions.css';


class Solutions extends Component {
  constructor(props) {
    super(props);

    this.mapSolutions = this.mapSolutions.bind(this);
    this.getNumCorrect = this.getNumCorrect.bind(this);
  }

  getNumCorrect() {
    const { questions } = this.props;
    return _.reduce(questions, (acc, question) =>{
      if(question.answer === question.userChoice) acc++;
      return acc;
    }, 0);
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
              match={match} />
            <Solution key={`solution-${i}`}
              question={question}
              showLongExplanation={showLongExplanation}
              longExplanation={longExplanation}
              history={history}
              match={match} />
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
              match={match} />
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
      <Grid>
        <div className='results-header-container'>
          <div className='results-header'>
            Good work! Score: {this.getNumCorrect()} / {questions.length}
          </div>
          <Button onClick={this.startQuiz}>New Quiz</Button>
        </div>
        { this.mapSolutions() }
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
  question: getLongExplanation(state)
});

const SolutionsContainer = connect(mapStateToProps, {
  showLongExplanation,
  hideLongExplanation
})(Solutions);

export default SolutionsContainer;