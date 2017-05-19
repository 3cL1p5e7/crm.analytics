import Builder from 'schemes/builder';
const schemeBuilder = new Builder();

export const SET_EVENTS = 'SET_EVENTS';
export const setEvents = (payload) => {
  if (!payload.events)
    return;
  const events = {};
  Object.keys(payload.events).forEach(event => {
    events[event] = schemeBuilder.build('event', payload.events[event]);
  });
  return { type: SET_EVENTS, events };
}

export const ADD_EVENT = 'ADD_EVENT';
export const addEvent = (payload) => {
  const event = schemeBuilder.build('event', payload.event);
  return { type: ADD_EVENT, event };
}

export const REMOVE_EVENT = 'REMOVE_EVENT';
export const removeEvent = (payload) => {
  return { type: REMOVE_EVENT, ...payload };
}

export const INVITE_TO_EVENT = 'INVITE_TO_EVENT';
export const inviteToEvent = (payload) => {
  return { type: INVITE_TO_EVENT, ...payload };
}
