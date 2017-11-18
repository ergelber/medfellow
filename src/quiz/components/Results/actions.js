import { createAction } from 'redux-actions';
// import fetch from 'whatwg-fetch';

import { SHOW_LONG_EXPLANATION, RESET } from './action_types';

export const showLongExplanation = createAction(SHOW_LONG_EXPLANATION);
export const hideLongExplanation = createAction(RESET);