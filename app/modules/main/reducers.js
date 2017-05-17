import { attachReducers } from 'store/utils';
import {
  SET_ACTIVE,
  REMOVE_ACTIVE
} from './actions.js';

const defaultState = {
  active: null
};

const reducers = {
  ['ROUTER_HANDLER']: (state, { attr, value }) => {
    return { active: name };
  },
  [SET_ACTIVE]: (state, { name }) => {
    return { active: name };
  },
  [REMOVE_ACTIVE]: (state, { name }) => {
    if (!name)
      return { active: null };
    const active = state.active !== name ? state.active : null;
    return { active: active };
  }
};

export default attachReducers(reducers, defaultState);
