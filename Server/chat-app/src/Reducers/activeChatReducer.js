const activeChatReducer = (state = null, action) => {
  switch (action.type) {
    case "ACTIVATE":
      return action.payload.id;
    case "DEACTIVATE":
      return null;
    default:
      return state;
  }
};
export default activeChatReducer;
