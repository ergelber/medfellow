import { combineReducers } from 'redux';

import { QuizReducer as currentQuiz } from './components/Quiz';
import { ResultsReducer as results } from './components/Results';

export default combineReducers({
  currentQuiz,
  results
});
