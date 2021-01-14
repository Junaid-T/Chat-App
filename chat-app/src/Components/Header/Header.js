import React from "react";
import classes from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  showParticipants,
  hideParticipants,
  deactivateChat,
} from "../../Actions/index";

const Header = (props) => {
  const dispatch = useDispatch();
  const participantView = useSelector((state) => state.participantView);
  const activeChat = useSelector((state) => state.activeChat);

  const toggleView = () => {
    participantView
      ? dispatch(hideParticipants())
      : dispatch(showParticipants());
  };

  const backToDashboard = () => {
    dispatch(hideParticipants());
    dispatch(deactivateChat());
  };

  const newChat = () => {
    props.socket.emit("newChat", "00000scas77");
  };

  return (
    <div className={classes.Header}>
      <button onClick={activeChat ? backToDashboard : props.handleClick}>
        {activeChat ? "Dashboard" : "Sign Out"}
      </button>
      <h3>Chat Room</h3>
      <button
        className={
          activeChat ? classes.ParticipantButton : classes.NewRoomButton
        }
        onClick={activeChat ? toggleView : newChat}
      >
        {activeChat ? "Participants" : "New Room"}
      </button>
    </div>
  );
};

export default Header;
