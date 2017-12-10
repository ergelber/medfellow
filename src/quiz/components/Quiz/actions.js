import { createAction } from 'redux-actions';
import 'whatwg-fetch';
import { v4 } from 'uuid';
import _ from 'lodash';

import { CHANGE_IDX, USER_CHOICE, SUBMIT_QUIZ, 
  REQUEST_CONTENT, RECEIVE_QUESTIONS, RESET, 
  QUIZ_TYPE, RECEIVE_PASSAGES
} from './action_types';
import { convertToJSON, setHeaders } from '../../../helpers/util';

// parse question data from server
const filterQuestions = (questions) => {
  return _.map(questions, (question) => {
    let filteredQuestion = _.assign({}, question, question.question_revisions[0]);
    delete filteredQuestion['question_revisions'];
    filteredQuestion.answers = _.map(filteredQuestion.answers, (answer) => {
      return answer.answer;
    });
    return filteredQuestion;
  })
}

export const quizType = createAction(QUIZ_TYPE);
export const changeIdx = createAction(CHANGE_IDX);
export const submitQuiz = createAction(SUBMIT_QUIZ);
const resetIdx = createAction(RESET);
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
  const quizId = state.quiz.currentQuiz.quizId;
  const quizType = state.quiz.currentQuiz.quizType;

  if (quizId)
    dispatch(requestContent(section, v4()));

  else
    //need to get the quiz -- need to be rewritten
    dispatch(requestContent(section, quizId));

  const url = quizType === 'discrete' ? `/api/questions/${section}` : `/api/passages/${section}`;

  fetch(url, {
    headers: setHeaders(),
    credentials: 'include'
  })
  .then(convertToJSON)
  .then(({ questions, passages }) => {
    const filteredQuestions = filterQuestions(questions);
    if (passages) dispatch(receivePassages(passages));
    dispatch(receiveQuestions(filteredQuestions));
    dispatch(resetIdx());
  })
  .catch((e) => {
    console.log(e)
  });
}
