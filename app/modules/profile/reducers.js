import { attachReducers } from 'store/utils';
import {
  LOG_IN,
  LOG_OFF
} from './actions.js';

const defaultState = {
  logged: false,
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
};

export default attachReducers(reducers, defaultState);
