import { combineReducers, createStore } from 'redux';

import home from 'modules/home/reducers';
import calendar from 'modules/calendar/reducers';
import settings from 'modules/settings/reducers';
import profile from 'modules/profile/reducers';
import events from 'modules/events/reducers';
import main from 'modules/main/reducers';

const store = createStore(combineReducers({
  home,
  main,
  calendar,
  profile,
  events
}))
export default store;
