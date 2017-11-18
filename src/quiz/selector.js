import * as fromQuiz from './components/Quiz';
import * as fromResults from './components/Results';

export const getQuestionIdx = (state) => 
  fromQuiz.getIdx(state.quiz);

export const getQuestions = (state) => 
  fromQuiz.getQuestions(state.quiz);

export const getIsLoadingQuestions = (state) =>
  fromQuiz.getIsLoadingQuestions(state.quiz);


export const getLongExplanation = (state) =>
  fromResults.getLongExplanation(state.quiz);

export const hasLongExplanation = (state) => 
  fromResults.hasLongExplanation(state.quiz);