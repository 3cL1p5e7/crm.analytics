import { combineReducers, createStore } from 'redux';

import calendar from 'modules/calendar/reducers';
import settings from 'modules/settings/reducers';
import main from 'modules/main/reducers';

const store = createStore(combineReducers({
  main,
  calendar
}))
export default store;
