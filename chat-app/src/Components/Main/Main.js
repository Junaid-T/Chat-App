import React from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import Participants from "../Participants/Participants";
import { useSelector } from "react-redux";

const Main = (props) => {
  let content = null;
  const auth = useSelector((state) => state.auth);

  // Retrieves current chat messages and displays them, each message is a message componant
  let data = useSelector((state) => state.messages);
  const activeRoom = useSelector((state) => state.activeChat);
  if (data) {
    if (data[activeRoom].length === 1) {
      content = "Lets kick start this chat with a message";
    } else {
      content = data[activeRoom].map((message, i) => {
        console.log(content);
        if (i === 0) return null;
        return (
          <Message
            user={message.user}
            time={message.time}
            message={message.message}
            sender={auth.user === message.user}
            key={message._id}
            name={message.name}
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
