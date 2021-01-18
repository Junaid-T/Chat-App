import React from "react";
import classes from "./Participants.module.css";
import { useSelector } from "react-redux";

import uniqid from "uniqid";

const Participants = () => {
  //const store = useContext(StoreContext);
  const participantView = useSelector((state) => state.participantView);
  const activeChat = useSelector((state) => state.activeChat);

  const TEMP = participantView.participants[activeChat];

  let Participants = [];
  if (TEMP) {
    Participants = TEMP.map((Participants) => {
      return (
        <li className={classes.Participant} key={uniqid.time()}>
          {Participants}
        </li>
      );
    });
  }
  return (
    <ul
      className={
        participantView.view ? classes.ContainerShow : classes.ContainerHidden
      }
    >
      {Participants}
    </ul>
  );
};

export default Participants;
