export const validateName = (name) =>
  typeof name === 'string' && name.length >= 20 && name.length <= 60;

export const validateAddress = (addr) =>
  typeof addr === 'string' && addr.length <= 400;

export const validateEmail = (email) =>
  /^\S+@\S+\.\S+$/.test(email);

export const validatePassword = (pw) =>
  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(pw);
