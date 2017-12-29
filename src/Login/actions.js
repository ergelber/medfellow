import { createAction } from 'redux-actions';

import { LOGIN, LOGOUT, SIGNING_UP, 
  LOGGING_IN, SIGN_UP, SET_TOKEN,
  SET_LOGIN_NOTIFICATION, CLEAR_LOGIN_NOTIFICATION
} from './action_types';
import { convertToJSON, setHeaders } from '../helpers/util';

const localLogin = createAction(LOGIN);
const newSignup = createAction(SIGN_UP);
export const setLoginNotification = createAction(SET_LOGIN_NOTIFICATION);
export const clearLoginNotification = createAction(CLEAR_LOGIN_NOTIFICATION);

export const signingUp = createAction(SIGNING_UP);
export const loggingIn = createAction(LOGGING_IN);
const logoutAction = createAction(LOGOUT);

const setToken = createAction(SET_TOKEN);

export const logout = () => (dispatch, getState) => {
  localStorage.clear();
  dispatch(logoutAction());
}

export const login = (username, password) => (dispatch, getState) => {
  fetch('/login', {
    headers: setHeaders(),
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(convertToJSON)
  .then(({ token }) => {
    dispatch(setToken(token));
    dispatch(localLogin());
  })
  .catch((e) => {
    console.log(e);
  }) 
}

export const signup = (username, password) => (dispatch, getState) => {
  fetch('/signup', {
    headers: setHeaders(),
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(convertToJSON)
    .then(({ err, token }) => {
      if (err) return dispatch(setLoginNotification(err));
      dispatch(setToken(token));
      dispatch(localLogin());
    })
    .catch((e) => {
      console.log(e);
    }) 
}