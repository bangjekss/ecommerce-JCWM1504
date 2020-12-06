const loginAction = (data) => {
  return {
    type: 'LOGIN',
    payload: data,
  };
};
const registerAction = (data) => {
  return {
    type: 'REGISTER',
    payload: data,
  };
};

export { loginAction, registerAction };
