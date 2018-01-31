import { createAction } from 'redux-actions';

import { LOGIN, LOGOUT, SIGNING_UP, 
  LOGGING_IN, SET_TOKEN, SET_ROLE,
  SET_LOGIN_NOTIFICATION, CLEAR_LOGIN_NOTIFICATION
} from './action_types';
import { convertToJSON, setHeaders } from '../helpers/util';

const setRole = createAction(SET_ROLE);
const localLogin = createAction(LOGIN);
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
  return fetch('/login', {
    headers: setHeaders(),
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then(convertToJSON)
    .then(({ token, err, role }) => {
    if(err) {
      return { err }
    }
    dispatch(setRole(role));
    dispatch(setToken(token));
    dispatch(localLogin());
    return true;
  })
  .catch((err) => {
    console.log(err);
    return { err };
  }) 
}

export const signup = (username, password) => (dispatch, getState) => {
  return fetch('/signup', {
    headers: setHeaders(),
    method: 'POST',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(convertToJSON)
    .then(({ err, token }) => {
      if (err) {
        return { err };
      }
      dispatch(setToken(token));
      dispatch(localLogin());
      return token
    })
    .catch((err) => {
      console.log(err);
      return { err }
    }) 
}