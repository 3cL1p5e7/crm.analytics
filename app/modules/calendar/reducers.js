import { attachReducers } from 'store/utils';
import localization from 'plugins/localization';

import {
  SET_ACTIVE_CALENDAR,
  SET_ACTIVE_DAY,
  SET_WEEKS
} from './actions.js';

const defaultState = {
  weeks: [],
  activeDate: localization.moment().toString(),
  active: 'layout'
};

const reducers = {
  [SET_ACTIVE_CALENDAR]: (state, { name }) => {
    return { active: name };
  },
  [SET_ACTIVE_DAY]: (state, { date, weeks }) => {
    return {
      activeDate: date,
      weeks: weeks ? weeks : state.weeks
    };
  },
  [SET_WEEKS]: (state, { weeks }) => {
    return {
      weeks: weeks ? weeks : state.weeks
    };
  }
};

export default attachReducers(reducers, defaultState);
