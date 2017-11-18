import React, { PureComponent as Component } from 'react';
import { connect } from 'react-redux'

import QuestionCircles from './QuestionCircles';
import ButtonGroup from './ButtonGroup';
import Question from './Question';
import { changeIdx, setUserChoice, submitQuiz, createQuiz } from '../actions';
import { getQuestionIdx, getQuestions, getIsLoadingQuestions } from '../../../selector.js'

import './Quiz.css';

class Quiz extends Component {

  componentWillMount() {
    const { match, createQuiz } = this.props;
    createQuiz(match.params.section);
  }

  render() {
    const { questions, isLoadingQuestions } = this.props;

    if(isLoadingQuestions) return <div className='loader' />;

    return (
      <div>
        <QuestionCircles questions={questions} />
        <div className='question-container'>
          <Question {...this.props} />
        </div>
        <ButtonGroup {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  idx: getQuestionIdx(state),
  questions: getQuestions(state),
  isLoadingQuestions: getIsLoadingQuestions(state)
});

const QuizContainer = connect(mapStateToProps, {
  changeIdx,
  setUserChoice,
  submitQuiz,
  createQuiz
})(Quiz);

export default QuizContainer;