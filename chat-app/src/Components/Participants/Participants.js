import React from "react";
import classes from "./Participants.module.css";

const Participants = () => {
  const TEMP = [
    {
      id: "user_123",
      name: "A",
    },
    {
      id: "user_234",
      name: "B",
    },
  ];

  const particapents = TEMP.map((particapent) => {
    return (
      <li className={classes.Participant} key={particapent.id}>
        {particapent.name}
      </li>
    );
  });

  return <ul className={classes.Container}>{particapents}</ul>;
};

export default Participants;
