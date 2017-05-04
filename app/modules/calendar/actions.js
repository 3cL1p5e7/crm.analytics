export const SET_DATE = 'SET_DATE';
export const setDate = (date) => {
  return { type: SET_DATE, date };
}

export const SET_ACTIVE_MODULE = 'SET_ACTIVE_MODULE';
export const setActiveModule = (name) => {
  return { type: SET_ACTIVE_MODULE, name };
}
