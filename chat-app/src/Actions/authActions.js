export const userLoading = () => {
  return {
    type: "USER_LOADING",
  };
};

export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: {
      user,
    },
  };
};

export const registerSuccess = () => {
  return {
    type: "REGISTER_SUCCESS",
    payload: {},
  };
};

export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: {},
  };
};

export const authError = () => {
  return {
    type: "AUTH_ERROR",
    payload: {},
  };
};

export const loginFail = () => {
  return {
    type: "LOGIN_FAIL",
    payload: {},
  };
};

export const registerFail = () => {
  return {
    type: "REGISTER_FAIL",
    payload: {},
  };
};
