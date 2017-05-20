import { attachReducers } from 'store/utils';
import {
  LOG_IN,
  LOG_OFF,
  SET_ACTIVE_EXTENSION
} from './actions.js';

const defaultState = {
  logged: false,
  active: null,
  user: {}
};

const reducers = {
  [LOG_IN]: (state, { user }) => {
    return {
      logged: true,
      user
    };
  },
  [LOG_OFF]: (state) => {
    return {
      logged: false,
      user: {}
    };
  },
  [SET_ACTIVE_EXTENSION]: (state, { payload }) => {
    return {
      active: payload
    };
  }
};

export default attachReducers(reducers, defaultState);
