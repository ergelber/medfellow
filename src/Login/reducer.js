import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import { IS_LOGGED_IN } from './action_types';

const isLoggedIn = handleActions({
  [IS_LOGGED_IN]: (state, action) => true,
}, false);

export default combineReducers({
  isLoggedIn
});

export const getIsLoggedIn = (state) => {
  return state.isLoggedIn;
}