export const REGISTER = 'REGISTER';
export const register = (payload) => {
  return { type: REGISTER, ...payload };
}