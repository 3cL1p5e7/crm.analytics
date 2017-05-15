// import {
// } from './actions.js';

const defaultState = {
};

const reducers = {
  // [SET_PARAM]: (state, { name, value }) => {
  //   return { params: { ...state.params, [name]: value } };
  // }
};

export default function home(state = defaultState, action) {
  if (reducers[action.type])
    return { ...state, ...reducers[action.type](state, action) };
  return state;
}
