import {
  SET_DATE,
  SET_ACTIVE_MODULE
} from './actions.js';

const defaultState = {
  date: null,
  active: 'desk'
};

const reducers = {
  [SET_DATE]: (state, { date }) => {
    return { date };
  },
  [SET_ACTIVE_MODULE]: (state, { name }) => {
    return { active: name };
  }
};

export default function calendar(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action)};
  return state;
}
