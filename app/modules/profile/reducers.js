import {
  LOG_IN,
  LOG_OFF
} from './actions.js';
import Builder from 'schemes/builder';
const schemeBuilder = new Builder();

const defaultState = {
  logged: false,
  user: {}
};

const reducers = {
  [LOG_IN]: (state, { payload }) => {
    const user = schemeBuilder.build('user', payload);
    console.log(user);
    return {
      logged: true,
      user: user
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
