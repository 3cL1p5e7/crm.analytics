import {
  SET_DATE
} from './actions.js';

const defaultState = {
  date: null
};

const reducers = {
  [SET_DATE]: (state, { date }) => {
    return { date };
  }
};

export default function calendar(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action)};
  return state;
}
