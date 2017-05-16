export const REGISTER = 'REGISTER';
export const register = (payload) => {
  return { type: REGISTER, ...payload };
}

export const LOG_IN = 'LOG_IN';
export const EXIT = 'EXIT';
