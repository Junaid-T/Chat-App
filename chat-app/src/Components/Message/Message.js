import React from "react";
import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={classes.MessageContainer}>
      <div
        className={
          props.sender === true
            ? classes.MessageSender
            : classes.MessageReciever
        }
      >
        <div className={classes.Name}>
          {props.sender === true ? null : props.name}
        </div>
        <div className={classes.Message}>{props.message}</div>
        <div className={classes.Time}>{props.time}</div>
      </div>
    </div>
  );
};

export default Message;
