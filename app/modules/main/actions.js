export const SET_ACTIVE = 'SET_ACTIVE';
export const REMOVE_ACTIVE = 'REMOVE_ACTIVE';

export const setActive = (name) => {
  return { type: SET_ACTIVE, name };
};

export const removeActive = (name) => {
  return { type: REMOVE_ACTIVE, name };
};
