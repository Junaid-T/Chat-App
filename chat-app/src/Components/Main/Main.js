import React from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import Participants from "../Participants/Participants";
import { useSelector } from "react-redux";

const currentUser = "user_123";

const Main = (props) => {
  let content = null;
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  let DATA = useSelector((state) => state.messages);
  const activeRoom = useSelector((state) => state.activeChat);
  console.log(DATA);
  if (DATA) {
    if (DATA[activeRoom].length === 1) {
      content = "Lets kick start this chat with a message";
    } else {
      // CRASHED IF CLICKED TOO FAST

      content = DATA[activeRoom].map((message, i) => {
        if (i === 0) return null;
        return (
          <Message
            user={message.user}
            time={message.time}
            message={message.message}
            sender={auth.user === message.user}
            key={message._id}
          />
        );
      });
    }
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
