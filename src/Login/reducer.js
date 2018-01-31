import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import {
  LOGIN, LOGOUT, SIGNING_UP, SET_ROLE,
  LOGGING_IN, SET_TOKEN, CLEAR_LOGIN_NOTIFICATION,
  SET_LOGIN_NOTIFICATION } from './action_types';

const loginNotification = handleActions({
  [SET_LOGIN_NOTIFICATION]: (state, { payload }) => payload,
  [CLEAR_LOGIN_NOTIFICATION]: (state, action) => null
}, null);

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

const token = handleActions({
  [SET_TOKEN]: (state, { payload }) => payload
}, null);

const role = handleActions({
  [SET_ROLE]: (state, { payload }) => payload
}, null);

export default combineReducers({
  isLoggedIn,
  signingUp,
  loggingIn,
  token,
  loginNotification,
  role
});



