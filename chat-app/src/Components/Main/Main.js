import React, { useContext } from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import Participants from "../Participants/Participants";
import { StoreContext } from "../../Contexts/store";

const currentUser = "user_123";

const Main = (props) => {
  const store = useContext(StoreContext);
  let content = null;

  if (store.DATA) {
    content = store.DATA.map((message) => {
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
      <Input />
    </div>
  );
};

export default Main;
