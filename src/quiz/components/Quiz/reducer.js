import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import _ from 'lodash';

import { CHANGE_IDX, USER_CHOICE, RESET,
  SUBMIT_QUIZ, RECEIVE_QUESTIONS, REQUEST_CONTENT,
  RECEIVE_PASSAGES, QUIZ_TYPE
} from './action_types';

const fakePassage = "$$2+2$$ On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.These cases are perfectly simple and easy to distinguish.In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.These cases are perfectly simple and easy to distinguish.In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."

const idx = handleActions({
  [CHANGE_IDX]: (state, action) => state + action.payload,
  [RESET]: (state, action) => 0
}, 0);

const passage = handleActions({
  [RECEIVE_PASSAGES]: (state, action) => action.payload
}, fakePassage);

const quizType = handleActions({
  [QUIZ_TYPE]: (state, action) => action.payload
}, null);

const isLoading = handleActions({
  [REQUEST_CONTENT]: (state, action) => true,
  [RECEIVE_PASSAGES]: (state, action) => false,
  [RECEIVE_QUESTIONS]: (state, action) => false
}, false);

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

const quizId = handleActions({
  [REQUEST_CONTENT]: (state, action) => action.payload.uuid
}, null);

const section = handleActions({
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