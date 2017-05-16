export const REGISTER = 'REGISTER';
export const register = (payload) => {
  return { type: REGISTER, payload };
}

export const LOG_IN = 'LOG_IN';
export const login = (payload) => {
  return { type: LOG_IN, payload };
}

export const LOG_OFF = 'LOG_OFF';
export const logoff = (payload) => {
  return { type: LOG_OFF, payload };
}
