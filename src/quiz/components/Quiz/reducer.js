import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

import { CHANGE_IDX, USER_CHOICE, RESET,
  SUBMIT_QUIZ, RECEIVE_QUESTIONS, REQUEST_CONTENT,
  RECEIVE_PASSAGES, QUIZ_TYPE, RESET_IDX
} from './action_types';

const idx = handleActions({
  [CHANGE_IDX]: (state, action) => state + action.payload,
  [RESET]: (state, action) => 0
}, 0);

const passage = handleActions({
  [RESET]: (state, action) => {},
  [RECEIVE_PASSAGES]: (state, action) => action.payload
}, {});

const quizType = handleActions({
  [RESET]: (state, action) => null,
  [QUIZ_TYPE]: (state, action) => action.payload
}, null);

const isLoading = handleActions({
  [REQUEST_CONTENT]: (state, action) => true,
  [RECEIVE_PASSAGES]: (state, action) => false,
  [RECEIVE_QUESTIONS]: (state, action) => false
}, false);

const questions = handleActions({
  [RESET]: (state, action) => [],
  [RECEIVE_QUESTIONS]: (state, action) => action.payload,
  [USER_CHOICE]: (state, action) => {
    const newState = _.map(state);
    newState[action.payload.idx].userChoice = action.payload.userChoice;
    return newState;
  },
  [RESET_IDX]: (state, action) => {
    return _.map(state, (question) => {
      question.userChoice = null;
      return question;
    });
  }
}, []);

const quizSubmitted = handleActions({
  [RESET]: (state, action) => false,
  [SUBMIT_QUIZ]: (state, action) => true
}, false);

const quizId = handleActions({
  [RESET]: (state, action) => null,
  [REQUEST_CONTENT]: (state, action) => action.payload.uuid
}, null);

const section = handleActions({
  [RESET]: (state, action) => null,
  [REQUEST_CONTENT]: (state, action) => action.payload.section
}, null);

export default combineReducers({
  idx,
  quizType,
  questions,
  quizSubmitted,
  isLoading,
  quizId,
  section,
  passage
});