import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

import QuestionCircles from './QuestionCircles';
import ButtonGroup from './ButtonGroup';
import Question from './Question';
import Passage from './Passage';
import { changeIdx, setUserChoice, submitQuiz, createQuiz } from '../actions';
import { getQuestionIdx, getQuestions, getIsLoading,
  getPassages, getQuizType } from '../../../selector.js'

import './Quiz.css';

class Quiz extends Component {

  componentWillMount() {
    const { match, createQuiz } = this.props;
    createQuiz(match.params.section);
  }

  render() {
    const { questions, isLoading, quizType, passages } = this.props;

    if(isLoading) return <div className='loader' />;

    return (
      <div>
        <QuestionCircles questions={questions} />
        {
          quizType === 'passage' ? 
          <div className='passage-question-container'>
            <Col sm={12} md={6}>
              <Passage passages={passages} />
            </Col>
            <Col sm={12} md={6}>
              <Question {...this.props} />
              <ButtonGroup {...this.props} />
            </Col>
          </div> :
          <div className='question-container'>
            <Question {...this.props} />
            <ButtonGroup {...this.props} />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  idx: getQuestionIdx(state),
  questions: getQuestions(state),
  passages: getPassages(state),
  isLoading: getIsLoading(state),
  quizType: getQuizType(state)
});

const QuizContainer = connect(mapStateToProps, {
  changeIdx,
  setUserChoice,
  submitQuiz,
  createQuiz
})(Quiz);

export default QuizContainer;