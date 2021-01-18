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
export const addParticipant = (name, chat) => {
  return {
    type: "ADD",
    payload: {
      name: name,
      chat: chat,
    },
  };
};
export const removeParticipants = (name, chat) => {
  return {
    type: "REMOVE",
    payload: {
      name: name,
      chat: chat,
    },
  };
};
