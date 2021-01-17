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
