import Builder from 'schemes/builder';
const schemeBuilder = new Builder();

export const SET_EVENTS = 'SET_EVENTS';
export const setEvents = (events, mapKey) => {
  if (!events)
    return;
  const _events = schemeBuilder
    .getAdditional('user', 'events', events, mapKey);
  return { type: SET_EVENTS, events: _events };
};

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (payload) => {
  const event = schemeBuilder.build('event', payload.event);
  return { type: ADD_EVENT, event };
};

export const REMOVE_EVENT = 'REMOVE_EVENT';
export const removeEvent = (payload) => {
  return { type: REMOVE_EVENT, ...payload };
};

export const INVITE_TO_EVENT = 'INVITE_TO_EVENT';
export const inviteToEvent = (payload) => {
  return { type: INVITE_TO_EVENT, ...payload };
};
