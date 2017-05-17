import {
  SET_ACTIVE_HOME
} from './actions.js';

const defaultState = {
  active: 'dash'
};

const reducers = {
  [SET_ACTIVE_HOME]: (state, { name }) => {
    return { active: name };
  }
};

export default function home(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
