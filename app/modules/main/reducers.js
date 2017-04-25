import {
  SET_ACTIVE,
  REMOVE_ACTIVE
} from './actions.js';

const defaultState = {
  active: null
};

const reducers = {
  [SET_ACTIVE]: (state, { name }) => {
    return { active: name };
  },
  [REMOVE_ACTIVE]: (state, { name }) => {
    const active = state.active !== name ? state.active : null;
    return { active: active };
  }
};

export default function main(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
