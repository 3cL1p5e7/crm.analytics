import Builder from 'schemes/builder';
const schemeBuilder = new Builder();

export const REGISTER = 'REGISTER';
export const register = (payload) => {
  return { type: REGISTER, payload };
}

export const LOG_IN = 'LOG_IN';
export const login = (user) => {
  const _user = schemeBuilder.build('user', user);
  console.log(user);
  return { type: LOG_IN, user: _user };
}

export const LOG_OFF = 'LOG_OFF';
export const logoff = (payload) => {
  return { type: LOG_OFF, payload };
}
