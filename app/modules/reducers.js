import {
  SET_ACTIVE
} from './actions.js';

const defaultState = {
  active: null
};

const reducers = {
  [SET_ACTIVE]: ({ name }) => {
    return { active: name };
  }
};

export default function main(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](action) };
  return state;
}
