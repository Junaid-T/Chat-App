const intialState = {
  view: false,
  participants: {},
};
const participantViewReducer = (state = intialState, action) => {
  switch (action.type) {
    case "SHOW":
      return { ...state, view: true };
    case "Hide":
      return { ...state, view: false };
    case "ADD":
      const chat = state.participants[action.payload.chat];
      if (!chat) {
        return {
          ...state,
          participants: {
            ...state.participants,
            [action.payload.chat]: [action.payload.name],
          },
        };
      }
      const updatedChat = [...chat, action.payload.name];
      return {
        ...state,
        participants: {
          ...state.participants,
          [action.payload.chat]: updatedChat,
        },
      };
    default:
      return state;
  }
};

export default participantViewReducer;
