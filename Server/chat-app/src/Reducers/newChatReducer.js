const initialState = {
  view: false,
  hasError: false,
};

const newChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        view: true,
      };
    case "Hide":
      return {
        ...state,
        view: false,
      };
    case "ERROR":
      return {
        ...state,
        hasError: true,
      };
    case "HIDE_ERROR":
      return {
        ...state,
        hasError: false,
      };
    default:
      return false;
  }
};

export default newChatReducer;
