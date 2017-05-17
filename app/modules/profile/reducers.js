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

export default function profile(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
