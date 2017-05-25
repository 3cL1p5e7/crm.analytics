import { attachReducers } from 'store/utils';
import {
  LOG_IN,
  LOG_OFF,
  SET_ACTIVE_FORM,
  SET_FRIENDS
} from './actions.js';

const defaultState = {
  logged: false,
  activeForm: null,
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
  [SET_ACTIVE_FORM]: (state, { payload }) => {
    return {
      activeForm: payload
    };
  },
  [SET_FRIENDS](state, { friends }) {
    return {
      user: {
        ...state.user,
        friends
      }
    };
  }
};

export default attachReducers(reducers, defaultState);
