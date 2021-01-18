import participantViewReducer from "./participantsReducer";
import activeChatReducer from "./activeChatReducer";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import newChatReducer from "./newChatReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  participantView: participantViewReducer,
  activeChat: activeChatReducer,
  auth: authReducer,
  messages: messagesReducer,
  newChat: newChatReducer,
});

export default rootReducer;
