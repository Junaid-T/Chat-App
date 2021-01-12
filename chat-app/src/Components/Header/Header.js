import React from "react";
import classes from "./Header.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  showParticipants,
  hideParticipants,
  activateChat,
  deactivateChat,
} from "../../Actions/index";

const Header = (props) => {
  const dispatch = useDispatch();
  const participantView = useSelector((state) => state.participantView);
  const activeChat = useSelector((state) => state.activeChat);

  const toggleView = () => {
    console.log(participantView);
    participantView
      ? dispatch(hideParticipants())
      : dispatch(showParticipants());
  };

  const backToDashboard = () => {
    dispatch(hideParticipants());
    dispatch(deactivateChat());
  };

  return (
    <div className={classes.Header}>
      <button onClick={activeChat ? backToDashboard : props.handleClick}>
        {activeChat ? "Dashboard" : "Sign Out"}
      </button>
      <h3>Chat Room</h3>
      <button
        className={classes.ParticipantButton}
        onClick={activeChat ? toggleView : null}
      >
        Participants
      </button>
    </div>
  );
};

export default Header;
