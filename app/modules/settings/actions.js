export const SET_PARAM = 'SET_PARAM';
export const setParam = (name, value) => {
  return { type: SET_PARAM, name, value };
}