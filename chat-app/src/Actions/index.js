export const getErrors = (id, message) => {
  return {
    type: "GET_ERRORS",
    payload: {
      id: id,
      message: message,
    },
  };
};

export const clearErrors = (id, message) => {
  return {
    type: "CLEAR_ERRORS",
    payload: {
      id: id,
      message: message,
    },
  };
};
