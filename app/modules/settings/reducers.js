import {
  SET_PARAM
} from './actions.js';

const defaultState = {
  params: {
  }
};

const reducers = {
  [SET_PARAM]: (state, { name, value }) => {
    return { params: { ...state.params, [name]: value } };
  }
};

export default function settings(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
