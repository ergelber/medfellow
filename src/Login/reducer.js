import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { LOGIN, LOGOUT, SIGNING_UP, LOGGING_IN } from './action_types';

const isLoggedIn = handleActions({
  [LOGIN]: (state, action) => true,
  [LOGOUT]: (state, action) => false
}, false);

const signingUp = handleActions({
  [SIGNING_UP]: (state, action) => true,
  [LOGGING_IN]: (state, action) => false
}, false);

const loggingIn = handleActions({
  [LOGGING_IN]: (state, action) => true,
  [SIGNING_UP]: (state, action) => false,
}, false);

export default combineReducers({
  isLoggedIn,
  signingUp,
  loggingIn
});



