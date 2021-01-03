import React, { useContext } from "react";
import classes from "./Header.module.css";
import { StoreContext } from "../../Contexts/store";

const Header = (props) => {
  const store = useContext(StoreContext);

  const toggleView = () => {
    store.setParticipantView(!store.participantView);
  };

  const backToDashboard = () => {
    store.setActiveChat(null);
    store.setParticipantView(false);
  };

  return (
    <div className={classes.Header}>
      <button onClick={store.activeChat ? backToDashboard : props.handleClick}>
        {store.activeChat ? "Dashboard" : "Sign Out"}
      </button>
      <h3>Chat Room</h3>
      <button
        className={classes.ParticipantButton}
        onClick={store.activeChat ? toggleView : null}
      >
        Participants
      </button>
    </div>
  );
};

export default Header;
