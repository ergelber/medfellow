import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import {
  QUESTION_TYPE, RESET, REQUEST_CONTENT,
  RECEIVE_QUESTIONS, RECEIVE_PASSAGES,
  RECEIVE_QUESTION, RECEIVE_PASSAGE,
  POSTING_CONTENT
} from './action_types';

const activeQuestion = handleActions({
  [RESET]: (state, action) => null,
  [RECEIVE_QUESTION]: (state, action) => action.payload
}, null)

const activePassage = handleActions({
  [RESET]: (state, action) => null,
  [RECEIVE_PASSAGE]: (state, action) => action.payload
}, null)

const questions = handleActions({
  [RESET]: (state, action) => [],
  [RECEIVE_QUESTIONS]: (state, action) => action.payload
}, []);

const passages = handleActions({
  [RESET]: (state, action) => [],
  [RECEIVE_PASSAGES]: (state, action) => action.payload
}, []);

const questionType = handleActions({
  [QUESTION_TYPE]: (state, action) => action.payload
}, null);

const isLoading = handleActions({
  [REQUEST_CONTENT]: (state, action) => true,
  [RECEIVE_PASSAGES]: (state, action) => false,
  [RECEIVE_QUESTIONS]: (state, action) => false,
  [POSTING_CONTENT]: (state, { payload }) => payload
}, false);

export default combineReducers({
  questions,
  passages,
  questionType,
  activePassage,
  activeQuestion,
  isLoading
});