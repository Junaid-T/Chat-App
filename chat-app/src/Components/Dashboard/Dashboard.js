import React, { useContext, useEffect } from "react";
import axios from "axios";
import classes from "./Dashboard.module.css";
import Main from "../Main/Main";
import { StoreContext } from "../../Contexts/store";

import { useSelector, useDispatch } from "react-redux";
import { activateChat, loadChat } from "../../Actions/index";

const Dashboard = () => {
  const store = useContext(StoreContext);
  const activeChat = useSelector((state) => state.activeChat);
  const dispatch = useDispatch();

  const userRooms = [236236, 236263, 246324]; // TEMP HARDCODED ROOM DATA

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
    <Main />
  ) : (
    <div className={classes.Container}>{rooms}</div>
  );
};

export default Dashboard;
