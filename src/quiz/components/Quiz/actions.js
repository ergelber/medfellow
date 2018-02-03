import { createAction } from 'redux-actions';
import 'whatwg-fetch';
import { v4 } from 'uuid';

import { CHANGE_IDX, USER_CHOICE, SUBMIT_QUIZ, 
  REQUEST_CONTENT, RECEIVE_QUESTIONS, RESET, 
  QUIZ_TYPE, RECEIVE_PASSAGES, RESET_IDX
} from './action_types';
import { convertToJSON, setHeaders } from '../../../helpers/util';
import { getToken } from '../../../reducer';

export const quizType = createAction(QUIZ_TYPE);
export const changeIdx = createAction(CHANGE_IDX);
export const submitQuiz = createAction(SUBMIT_QUIZ);
const resetIdx = createAction(RESET_IDX);
export const reset = createAction(RESET)
export const setUserChoice = createAction(USER_CHOICE, (userChoice, idx) => (
  { userChoice, idx }
));

// getting passages and/or questions
export const requestContent = createAction(REQUEST_CONTENT, (section, uuid) => ({
  section, 
  uuid
}));
export const receiveQuestions = createAction(RECEIVE_QUESTIONS);
export const receivePassages = createAction(RECEIVE_PASSAGES);

export const createQuiz = (section) => (dispatch, getState) => {
  const state = getState();
  const token = getToken(state);
  const quizId = state.quiz.currentQuiz.quizId;
  const quizType = state.quiz.currentQuiz.quizType;

  if (quizId)
    dispatch(requestContent(section, v4()));

  else
    //need to get the quiz -- need to be rewritten
    dispatch(requestContent(section, quizId));

  const url = quizType === 'discrete' ? `/api/questions/${section}` : `/api/passages/${section}`;

  fetch(url, {
    headers: setHeaders(token),
    credentials: 'include'
  })
  .then(convertToJSON)
  .then(({ questions, passages }) => {
    if (passages) dispatch(receivePassages(passages));
    dispatch(receiveQuestions(questions));
    dispatch(resetIdx());
  })
  .catch((e) => {
    console.log(e)
  });
}
