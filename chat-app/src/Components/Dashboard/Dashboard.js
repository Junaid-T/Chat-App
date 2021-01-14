import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import Main from "../Main/Main";
import { useSelector, useDispatch } from "react-redux";
import { activateChat } from "../../Actions/index";

const Dashboard = (props) => {
  const activeChat = useSelector((state) => state.activeChat);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const userRooms = Object.keys(messages);

  const showRoom = (e) => {
    dispatch(activateChat(e.target.id));
  };

  const rooms = userRooms.map((room) => {
    return (
      <div className={classes.Room} key={room} onClick={showRoom} id={room}>
        {room}
      </div>
    );
  });

  return activeChat ? (
    <Main socket={props.socket} />
  ) : (
    <div className={classes.Container}>{rooms}</div>
  );
};

export default Dashboard;
