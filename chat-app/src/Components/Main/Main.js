import React, { Fragment, useEffect } from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import axios from "axios";

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
    <Fragment>
      <ol className={classes.ContentContainer}>{content}</ol>
      <Input socket={props.socket} />
    </Fragment>
  );
};

export default Main;
