export const SET_DATE = 'SET_DATE';
export const setDate = (date) => {
  return { type: SET_DATE, date };
}

export const SET_ACTIVE_CALENDAR = 'SET_ACTIVE_CALENDAR';
export const setActiveCalendar = (name) => {
  return { type: SET_ACTIVE_CALENDAR, name };
}
