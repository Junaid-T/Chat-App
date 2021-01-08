import participantViewReducer from "./participantsReducer";
import activeChatReducer from "./activeChatReducer";
import authReducer from "./authReducer";
import messagesReducer from "./messagesReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  participantView: participantViewReducer,
  activeChat: activeChatReducer,
  auth: authReducer,
  messages: messagesReducer,
});

export default rootReducer;
