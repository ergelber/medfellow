import { combineReducers } from 'redux';

import { QuizReducer } from './quiz';
import { EditingReducer } from './editor';
import { LoginReducer, getIsLoggedIn as getIsLoggedInSelector } from './Login';

export default combineReducers({
  quiz: QuizReducer,
  editor: EditingReducer,
  login: LoginReducer
});

export const getIsLoggedIn = (state) => {
  return getIsLoggedInSelector(state.login);
}