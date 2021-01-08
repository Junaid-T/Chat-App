import React, { useContext } from "react";
import classes from "./Main.module.css";
import Message from "../Message/Message";
import Input from "../Input/Input";
import Participants from "../Participants/Participants";
import { StoreContext } from "../../Contexts/store";
import { useSelector } from "react-redux";

const currentUser = "user_123";

const Main = (props) => {
  const store = useContext(StoreContext);
  let content = null;

  let DATA = null;
  DATA = useSelector((state) => state.messages);
  console.log(DATA);
  if (DATA) {
    content = DATA[236236].map((message) => {
      //THIS NEEDS TO BE DYNAMIC - "ACTIVE ROOM"
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
