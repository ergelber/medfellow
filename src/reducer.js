import { combineReducers } from 'redux';

import { QuizReducer } from './quiz';
import { EditingReducer } from './editor';

export default combineReducers({
  quiz: QuizReducer,
  editor: EditingReducer
});
