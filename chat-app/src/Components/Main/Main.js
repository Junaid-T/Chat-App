import React from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import axios from "axios";
import Participants from "../Participants/Participants";

const currentUser = "user_123";

const Main = (props) => {
  let content = null;

  if (props.data) {
    content = props.data.map((message) => {
      return (
        <Message
          user={message.user}
          time={message.time}
          message={message.message}
          sender={message.user === currentUser}
          key={message._id}
        />
      );
    });
  }

  return (
    <div className={classes.Container}>
      <ol className={classes.ContentContainer}>{content}</ol>
      <Participants />
      <Input socket={props.socket} />
    </div>
  );
};

export default Main;
