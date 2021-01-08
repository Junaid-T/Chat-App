export const showParticipants = () => {
  return {
    type: "SHOW",
  };
};
export const hideParticipants = () => {
  return {
    type: "HIDE",
  };
};

export const activateChat = (id) => {
  return {
    type: "ACTIVATE",
    payload: {
      id: id,
    },
  };
};

export const deactivateChat = () => {
  return {
    type: "DEACTIVATE",
  };
};

export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const loadChat = (id, messages) => {
  return {
    type: "INITIALIZE_CHAT",
    payload: {
      id: id,
      messages: messages,
    },
  };
};

export const addToChat = (id, message) => {
  return {
    type: "ADD_MESSAGE",
    payload: {
      id: id,
      message: message,
    },
  };
};
