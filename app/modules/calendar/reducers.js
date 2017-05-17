import { attachReducers } from 'store/utils';
import {
  SET_DATE,
  SET_ACTIVE_CALENDAR
} from './actions.js';

const defaultState = {
  date: null,
  active: 'layout'
};

const reducers = {
  [SET_DATE]: (state, { date }) => {
    return { date };
  },
  [SET_ACTIVE_CALENDAR]: (state, { name }) => {
    return { active: name };
  }
};

export default attachReducers(reducers, defaultState);
