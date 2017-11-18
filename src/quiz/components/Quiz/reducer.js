import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

import { CHANGE_IDX, USER_CHOICE, RESET,
  SUBMIT_QUIZ, RECEIVE_QUESTIONS, REQUEST_QUESTIONS
} from './action_types';

const idx = handleActions({
  [CHANGE_IDX]: (state, action) => state + action.payload,
  [RESET]: (state, action) => 0
}, 0);

const questions = handleActions({
  [RECEIVE_QUESTIONS]: (state, action) => action.payload,
  [USER_CHOICE]: (state, action) => {
    const newState = _.map(state);
    newState[action.payload.idx].userChoice = action.payload.userChoice;
    return newState;
  },
  [RESET]: (state, action) => {
    return _.map(state, (question) => {
      question.userChoice = null;
      return question;
    });
  }
}, []);

const quizSubmitted = handleActions({
  [SUBMIT_QUIZ]: (state, action) => true
}, false);

const isLoadingQuestions = handleActions({
  [REQUEST_QUESTIONS]: (state, action) => true,
  [RECEIVE_QUESTIONS]: (state, action) => false
}, false);

const quizId = handleActions({
  [REQUEST_QUESTIONS]: (state, action) => action.payload.uuid
}, null);

const section = handleActions({
  [REQUEST_QUESTIONS]: (state, action) => action.payload.section
}, null);

export default combineReducers({
  idx,
  questions,
  quizSubmitted,
  isLoadingQuestions,
  quizId,
  section
});