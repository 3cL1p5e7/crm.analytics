import localization from 'plugins/localization';

export const SET_ACTIVE_CALENDAR = 'SET_ACTIVE_CALENDAR';
export const setActiveCalendar = (name) => {
  return { type: SET_ACTIVE_CALENDAR, name };
};

export const SET_ACTIVE_DAY = 'SET_ACTIVE_DAY';
export const setActiveDay = (date) => {
  return {
    type: SET_ACTIVE_DAY,
    date,
    weeks: weeks(localization.moment(date))
  };
};

export const SET_WEEKS = 'SET_WEEKS';
export const setWeeks = (date) => {
  return { type: SET_WEEKS, weeks: weeks(localization.moment(date)) };
};

const weeks = (moment) => {
  let count = 5;
  const weeks = [];
  const from = moment.clone().date(1).subtract(moment.date(1).weekday(), 'days');
  let to = from.clone().add(count * 7, 'days');
  if (to.month() === moment.month())
    to = from.clone().add((count++) * 7, 'days');
  for (let i = 0; i < count; i++) {
    const week = [];
    for (let j = 0; j < 7; j++)
      week.push(from.clone().add(i, 'weeks').add(j, 'days'));
    weeks.push(week);
  }
  return weeks;
};
