import { attachReducers } from 'store/utils';
import {
  SET_EVENTS,
  ADD_EVENT,
  REMOVE_EVENT,
  INVITE_TO_EVENT
} from './actions.js';
import { omit } from 'store/utils';

const defaultState = {
  events: {}
};

const reducers = {
  [SET_EVENTS]: (state, { events }) => {
    return {
      events: events
    };
  },
  [ADD_EVENT]: (state, { event }) => {
    return {
      events: { ...state.events, [event.id]: event }
    };
  },
  [REMOVE_EVENT]: (state, { id, remover }) => {
    return {
      events: omit(state.events, id)
    };
  },
  [INVITE_TO_EVENT]: (state, { id, userid }) => {
    if (!state.events[id])
      return {};
    const event = {
      ...state.events[id],
      participants: [...state.events[id].participants, userid]
    };
    return {
      events: { ...state.events, [event.id]: event }
    };
  },
};

export default attachReducers(reducers, defaultState);
