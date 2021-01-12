const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case "INITIALIZE_CHAT":
      return { ...state, [action.payload.id]: action.payload.messages };
    case "ADD_MESSAGE":
      const chat = state[action.payload.id];
      const updatedChat = [...chat, action.payload.message];
      return { ...state, [action.payload.id]: updatedChat };
    default:
      return state;
  }
};
export default messagesReducer;
