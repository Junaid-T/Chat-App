import React from "react";
import classes from "./Input.module.css";
import uniqid from "uniqid";

const Input = (props) => {
  const handleClick = (e) => {
    let content = e.target.parentElement.querySelector("input").value;

    props.socket.emit("message", {
      user: 123,
      time: 1,
      message: content,
      room: "Test Room",
      _id: uniqid.time(),
    });

    e.target.parentElement.querySelector("input").value = "";
  };

  ////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////

  return (
    <div className={classes.InputContainer}>
      <input
        className={classes.Input}
        type="text"
        placeholder="Message"
      ></input>
      <button className={classes.Submit} onClick={handleClick}>
        Send!
      </button>
    </div>
  );
};

export default Input;
