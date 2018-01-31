import { combineReducers } from 'redux';

import { QuizReducer } from './quiz';
import { EditingReducer, 
  getEditingQuestions as getEditingQuestionsSelector,
  getEditingPassages as getEditingPassagesSelector, 
  getEditingQuestionType as getEditingQuestionTypeSelector,
  getEditingActivePassage as getEditingActivePassageSelector, 
  getEditingActiveQuestion as getEditingActiveQuestionSelector
} from './editor';
import { LoginReducer, 
  getIsLoggedIn as getIsLoggedInSelector,
  getIsLoggingIn as getIsLoggingInSelector,
  getIsSigningUp as getIsSigningUpSelector, 
  getToken as getTokenSelector,
  getLoginNotification as getLoginNotificationSelector, 
  getUserRole as getUserRoleSelector
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

export const getToken = (state) => 
  getTokenSelector(state.login);

export const getUserRole = (state) =>
  getUserRoleSelector(state.login);

export const getLoginNotification = (state) =>
  getLoginNotificationSelector(state.login);


export const getEditingQuestions = (state) => 
  getEditingQuestionsSelector(state.editor);

export const getEditingPassages = (state) =>
  getEditingPassagesSelector(state.editor);

export const getEditingQuestionType = (state) =>
  getEditingQuestionTypeSelector(state.editor);

export const getEditingActivePassage = (state) =>
  getEditingActivePassageSelector(state.editor);

export const getEditingActiveQuestion = (state) =>
  getEditingActiveQuestionSelector(state.editor);
