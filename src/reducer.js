import { combineReducers } from 'redux';

import { QuizReducer } from './quiz';
import { EditingReducer } from './editor';
import { LoginReducer, 
  getIsLoggedIn as getIsLoggedInSelector,
  getIsLoggingIn as getIsLoggingInSelector,
  getIsSigningUp as getIsSigningUpSelector 
} from './Login';

export default combineReducers({
  quiz: QuizReducer,
  editor: EditingReducer,
  login: LoginReducer
});

export const getIsLoggedIn = (state) =>
  getIsLoggedInSelector(state.login);

export const getIsLoggingIn = (state) =>
  getIsLoggingInSelector(state.login);

export const getIsSigningUp = (state) =>
  getIsSigningUpSelector(state.login);
