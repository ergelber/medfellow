import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

import {
  SHOW_LONG_EXPLANATION, RESET
} from './action_types';

const longExplanation = handleActions({
  [SHOW_LONG_EXPLANATION]: (state, action) => action.payload,
  [RESET]: (state, action) => null
}, null);

export default combineReducers({
  longExplanation
});