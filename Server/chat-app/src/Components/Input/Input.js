import React from "react";
import classes from "./Input.module.css";
import uniqid from "uniqid";
import { useSelector } from "react-redux";

const Input = (props) => {
  const activeRoom = useSelector((state) => state.activeChat);
  const auth = useSelector((state) => state.auth);

  const handleClick = (e) => {
    let content = e.target.parentElement.querySelector("input").value;

    props.socket.emit("message", {
      user: auth.user,
      message: content,
      room: activeRoom,
      _id: uniqid.time(),
    });
    e.target.parentElement.querySelector("input").value = "";
  };

  return (
    <div className={classes.InputContainer}>
      <input className={classes.Input} type="text"></input>
      <button className={classes.Submit} onClick={handleClick}>
        Send!
      </button>
    </div>
  );
};

export default Input;
