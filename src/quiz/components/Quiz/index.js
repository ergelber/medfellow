import Quiz from './components/Quiz';
import Passage from './components/Passage';
import Question from './components/Question';
import { getIdx, getQuestions,hasPassages, 
  getPassages, getIsLoading, getQuizType 
} from './selectors';
import QuizReducer from './reducer';
import { createQuiz, quizType } from './actions';

// Components
export { Quiz, Question, Passage };

// Selectors
export { getIdx, getQuestions, getIsLoading,
  hasPassages, getPassages, getQuizType };

// Reducer
export { QuizReducer };

// Actions
export { createQuiz, quizType };