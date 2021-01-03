import React, { useContext } from "react";
import classes from "./Dashboard.module.css";
import Main from "../Main/Main";
import { StoreContext } from "../../Contexts/store";

const Dashboard = () => {
  const store = useContext(StoreContext);
  const userRooms = [236236, 236263, 246324]; // TEMP HARDCODED ROOM DATA

  const showRoom = (e) => {
    store.setActiveChat(e.target.id);
  };

  const rooms = userRooms.map((room) => {
    return (
      <div className={classes.Room} key={room} onClick={showRoom} id={room}>
        {room}
      </div>
    );
  });

  return store.activeChat ? (
    <Main />
  ) : (
    <div className={classes.Container}>{rooms}</div>
  );
};

export default Dashboard;
