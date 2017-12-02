import * as fromQuiz from './components/Quiz';
import * as fromResults from './components/Results';

export const getQuestionIdx = (state) => 
  fromQuiz.getIdx(state.quiz);

export const getQuizType = (state) =>
  fromQuiz.getQuizType(state.quiz);

export const getQuestions = (state) => 
  fromQuiz.getQuestions(state.quiz);

export const getIsLoading = (state) =>
  fromQuiz.getIsLoading(state.quiz);

export const getPassages = (state) =>
  fromQuiz.getPassages(state.quiz);

export const hasPassages = (state) =>
  fromQuiz.hasPassages(state.quiz);


export const getLongExplanation = (state) =>
  fromResults.getLongExplanation(state.quiz);

export const hasLongExplanation = (state) => 
  fromResults.hasLongExplanation(state.quiz);