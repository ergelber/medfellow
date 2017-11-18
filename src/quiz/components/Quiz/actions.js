import { createAction } from 'redux-actions';
import 'whatwg-fetch';
import { v4 } from 'uuid';
import _ from 'lodash';

import { CHANGE_IDX, USER_CHOICE, SUBMIT_QUIZ, 
  REQUEST_QUESTIONS, RECEIVE_QUESTIONS, RESET
} from './action_types';
import { convertToJSON, setHeaders } from '../../../helpers/util';

export const changeIdx = createAction(CHANGE_IDX);
export const submitQuiz = createAction(SUBMIT_QUIZ);
const resetIdx = createAction(RESET);
export const setUserChoice = createAction(USER_CHOICE, (userChoice, idx) => (
  { userChoice, idx }
));

// getting questions
export const requestQuestions = createAction(REQUEST_QUESTIONS, (section, uuid) => ({
  section, 
  uuid
}));
export const receiveQuestions = createAction(RECEIVE_QUESTIONS);

export const createQuiz = (section) => (dispatch, getState) => {
  const state = getState();
  const quizId = state.quiz.currentQuiz.quizId;

  if(quizId)
    dispatch(requestQuestions(section, v4()));

  else  
    //need to get the quiz -- need to be rewritten
    dispatch(requestQuestions(section, quizId));

  fetch(`/api/questions/${section}`, {
    headers: setHeaders()
  })
  .then(convertToJSON)
  .then(({ questions }) => {
    const filteredQuestions = _.map(questions, (question) => {
      let filteredQuestion = _.assign({}, question, question.question_revisions[0]);
      delete filteredQuestion['question_revisions'];
      filteredQuestion.answers = _.map(filteredQuestion.answers, (answer) => {
        return answer.answer;
      });
      return filteredQuestion;
    })
    dispatch(receiveQuestions(filteredQuestions));
    dispatch(resetIdx());
  })
  .catch((e) => {
    console.log(e)
  })
}
