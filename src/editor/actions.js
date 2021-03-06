import { createAction } from 'redux-actions';

import {
  QUESTION_TYPE, RESET, REQUEST_CONTENT, 
  RECEIVE_QUESTIONS, RECEIVE_PASSAGES,
  RECEIVE_QUESTION, RECEIVE_PASSAGE, POSTING_CONTENT
} from './action_types';
import { convertToJSON, setHeaders } from '../helpers/util';
import { getToken } from '../reducer';

export const setQuestionType = createAction(QUESTION_TYPE);
export const reset = createAction(RESET);

// getting passages and/or questions
const requestContent = createAction(REQUEST_CONTENT);
const receiveQuestions = createAction(RECEIVE_QUESTIONS);
const receivePassages = createAction(RECEIVE_PASSAGES);

const receiveQuestion = createAction(RECEIVE_QUESTION);
const receivePassage = createAction(RECEIVE_PASSAGE);

const isPostingContent = createAction(POSTING_CONTENT);

export const getQuestionsOrPassages = (questionType, section) => (dispatch, getState) => {
  const state = getState();
  const token = getToken(state);

  dispatch(requestContent(section));

  const url = questionType === 'discrete' ? `/edit/questions/${section}` : `/edit/passages/${section}`;

  fetch(url, {
    headers: setHeaders(token),
    credentials: 'include'
  })
    .then(convertToJSON)
    .then(({ questions, passages }) => {
      if (passages) dispatch(receivePassages(passages));
      else dispatch(receiveQuestions(questions));
    })
    .catch((e) => {
      console.log(e)
    });
}

export const editContent = (questionType, id) => (dispatch, getState) => {
  const state = getState();
  const token = getToken(state);

  dispatch(requestContent(id));

  const url = questionType === 'discrete' ? `/edit/question/${id}` : `/edit/passage/${id}`;

  return fetch(url, {
    headers: setHeaders(token),
    credentials: 'include'
  })
    .then(convertToJSON)
    .then(({ question, questions, passage }) => {
      if(question) {
        dispatch(receiveQuestion(question));
        return { question };
      }
      dispatch(receivePassage(passage));
      dispatch(receiveQuestions(questions));
      return { passage, questions };
    })
    .catch((e) => {
      console.log(e)
    });
}

export const updateContent = (questionType, id, data) => (dispatch, getState) => {
  const state = getState();
  const token = getToken(state);

  dispatch(isPostingContent(true));

  let url;
  if(id) {
    url = questionType === 'discrete' ? `/edit/question/${id}` : `/edit/passage/${id}`;
  } else {
    url = questionType === 'discrete' ? `/edit/question` : `/edit/passage`;
  }
  
  return fetch(url, {
    headers: setHeaders(token),
    method: id ? 'PUT' : 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  })
    .then(convertToJSON)
    .then((res) => {
      dispatch(isPostingContent(false));
      return res;
    })
    .catch((e) => {
      console.log(e)
    });
}