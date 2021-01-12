import React, { useEffect, useState } from "react";
import classes from "./Dashboard.module.css";
import Main from "../Main/Main";
import { useSelector, useDispatch } from "react-redux";
import { activateChat, loadChat, addToChat } from "../../Actions/index";
import socketIOClient from "socket.io-client";

// const socket = socketIOClient("http://127.0.0.1:3001", {
//   query: { rooms: ["236236", "236263", "246324"], token: "12345" },
// });

const Dashboard = (props) => {
  const activeChat = useSelector((state) => state.activeChat);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  const userRooms = Object.keys(messages);

  // useEffect(() => {
  //   socket.on("message", (data) => {
  //     dispatch(addToChat(data.room, data));
  //   });

  //   socket.on("oldMessages", (data) => {
  //     console.log(data);
  //     for (const room in data) {
  //       dispatch(loadChat(room, data[room]));
  //     }
  //   });
  // }, [dispatch]);

  // socket.on("message", (data) => {
  //   dispatch(addToChat(data.room, data));
  // });

  // socket.on("oldMessages", (data) => {
  //   console.log(data);
  //   for (const room in data) {
  //     dispatch(loadChat(room, data[room]));
  //   }
  // });

  // socket.on("Auth Error", (data) => {
  //   console.log(data);
  // });

  //////////////////////////////////////
  //////////////////////////////
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
