import { createAction } from 'redux-actions';

import { IS_LOGGED_IN } from './action_types';

export const login = createAction(IS_LOGGED_IN);