import Builder from 'schemes/builder';
const schemeBuilder = new Builder();

export const REGISTER = 'REGISTER';
export const register = (payload) => {
  return { type: REGISTER, payload };
}

export const LOG_IN = 'LOG_IN';
export const login = (user, mapKey) => {
  const _user = schemeBuilder.parse('user', user, mapKey);
  return { type: LOG_IN, user: _user };
}

export const LOG_OFF = 'LOG_OFF';
export const logoff = (payload) => {
  return { type: LOG_OFF, payload };
}

export const SET_ACTIVE_FORM = 'SET_ACTIVE_EXTENSION';
export const setActiveProfileForm = (payload) => {
  return { type: SET_ACTIVE_FORM, payload };
}

export const SET_FRIENDS = 'SET_FRIENDS';
export const setFriends = (friends, mapKey) => {
  const _friends = schemeBuilder
                .getAdditional('user', 'friends', friends, mapKey);
  return { type: SET_FRIENDS, friends: _friends };
}
