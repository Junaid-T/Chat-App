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
