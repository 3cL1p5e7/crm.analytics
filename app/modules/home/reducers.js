import { attachReducers } from 'store/utils';
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

export default attachReducers(reducers, defaultState);
