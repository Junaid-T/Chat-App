import React, { useState } from "react";
import classes from "./NewChat.module.css";
import Modal from "../Modal/Modal";
import uniqid from "uniqid";

const NewChat = (props) => {
  const [newName, setNewName] = useState(null);

  const createNew = () => {
    if (!newName) return;

    props.socket.emit("newChat", {
      id: uniqid.time(),
      name: newName,
    });
  };

  return (
    <div className={classes.Container}>
      <Modal />
      <form>
        <label className={classes.Label} htmlFor="newRoom">
          Create a new room
        </label>
        <input
          className={classes.Input}
          id="newRoom"
          placeholder="Room Name"
          onChange={(e) => setNewName(e.target.value)}
        ></input>
        <div className={classes.Submit} onClick={createNew}>
          Create
        </div>
        <label className={classes.Label} htmlFor="joinRoom">
          Or join a room
        </label>
        <input
          className={classes.Input}
          id="joinRoom"
          placeholder="Room ID"
        ></input>
        <div className={classes.Submit}>Join</div>
      </form>
    </div>
  );
};

export default NewChat;
