import React, { useContext } from "react";
import classes from "./Input.module.css";
import uniqid from "uniqid";
import { StoreContext } from "../../Contexts/store";

const Input = (props) => {
  const store = useContext(StoreContext);
  const handleClick = (e) => {
    let content = e.target.parentElement.querySelector("input").value;

    store.socket.emit("message", {
      user: "user_123",
      time: 1,
      message: content,
      room: "236236",
      _id: uniqid.time(),
    });
    e.target.parentElement.querySelector("input").value = "";
  };

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
