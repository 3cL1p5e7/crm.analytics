import { combineReducers, createStore } from 'redux';

import calendar from 'modules/calendar/reducers';
import main from 'modules/reducers.js';

const store = createStore(combineReducers({
  main,
  calendar
}))
export default store;
