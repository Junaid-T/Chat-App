import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import Main from "../Main/Main";
import NewChat from "../NewChat/NewChat";
import { useSelector, useDispatch } from "react-redux";
import { activateChat } from "../../Actions/activeChatActions";

const Dashboard = (props) => {
  const activeChat = useSelector((state) => state.activeChat);
  const messages = useSelector((state) => state.messages);
  const newChat = useSelector((state) => state.newChat);
  const dispatch = useDispatch();

  const userRooms = Object.keys(messages);

  const showRoom = (e) => {
    dispatch(activateChat(e.target.id));
  };

  const rooms = userRooms.map((room) => {
    return (
      <div className={classes.Room} key={room} onClick={showRoom} id={room}>
        {messages[room][0].name}
      </div>
    );
  });

  return activeChat ? (
    <Main socket={props.socket} />
  ) : (
    <div className={classes.Container}>
      {newChat ? <NewChat socket={props.socket} /> : null}
      {rooms}
    </div>
  );
};

export default Dashboard;
