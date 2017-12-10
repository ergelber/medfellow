import { createAction } from 'redux-actions';

import { LOGIN, LOGOUT, SIGNING_UP, LOGGING_IN, SIGN_UP} from './action_types';
import { convertToJSON, setHeaders } from '../helpers/util';

const localLogin = createAction(LOGIN);
const signup = createAction(SIGN_UP);

export const signingUp = createAction(SIGNING_UP);
export const loggingIn = createAction(LOGGING_IN);
const logoutAction = createAction(LOGOUT);

export const logout = () => (dispatch, getState) => {
  localStorage.clear();
  dispatch(logoutAction());
}

export const login = () => (dispatch, getState) => {
  const state = getState();
  const signingUp = state.login.signingUp;

  fetch('/login', {
    headers: setHeaders(),
    method: 'POST',
    body: JSON.stringify({
      username: 'test12345',
      password: 'test'
    })
  })
  .then(convertToJSON)
  .then(({loggedIn}) => {
    // if (id && username) {
      // if(signingUp) {
      //   return dispatch(signup())
      // }
      if(loggedIn)
        return dispatch(localLogin());
    //}
    console.log('could not find user');
  })
  .catch((e) => {
    console.log(e);
  }) 
}