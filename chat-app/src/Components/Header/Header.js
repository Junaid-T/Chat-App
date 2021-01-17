import React from "react";
import classes from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";
import { deactivateChat } from "../../Actions/activeChatActions";
import { showNewChatView } from "../../Actions/newChatAction";
import { logoutSuccess } from "../../Actions/authActions";
import {
  showParticipants,
  hideParticipants,
} from "../../Actions/participantActions";

const Header = () => {
  const dispatch = useDispatch();
  const participantView = useSelector((state) => state.participantView);
  const activeChat = useSelector((state) => state.activeChat);
  const auth = useSelector((state) => state.auth);

  const toggleView = () => {
    participantView
      ? dispatch(hideParticipants())
      : dispatch(showParticipants());
  };

  const backToDashboard = () => {
    dispatch(hideParticipants());
    dispatch(deactivateChat());
  };

  const newChatView = () => {
    dispatch(showNewChatView());
  };

  const signOut = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
  };

  return (
    <div className={classes.Header}>
      <button
        style={{ visibility: auth.isAuth ? "visible" : "hidden" }}
        onClick={activeChat ? backToDashboard : signOut}
      >
        {activeChat ? "Dashboard" : "Sign Out"}
      </button>
      <h3>Chat App</h3>
      <button
        className={
          auth.isAuth
            ? activeChat
              ? classes.ParticipantButton
              : classes.NewRoomButton
            : classes.InactiveButton
        }
        onClick={activeChat ? toggleView : newChatView}
      >
        {activeChat ? "Participants" : "New Room"}
      </button>
    </div>
  );
};

export default Header;
