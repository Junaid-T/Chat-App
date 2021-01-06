import React, { useState, createContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

export const StoreContext = createContext();

// Connect client to server & pass users rooms
const socket = socketIOClient("http://127.0.0.1:3001", {
  query: { rooms: [236236, 236263, 246324] },
});

export const StoreProvider = (props) => {
  const [participantView, setParticipantView] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [DATA, setDATA] = useState([]);

  // Fetch the old messages in that room
  useEffect(() => {
    const TEMP_URL = "http://127.0.0.1:3001/api/v1/chat";

    const getOlderMessages = async () => {
      const olderMessages = await axios.get(TEMP_URL);
      return olderMessages.data.data.messages;
    };

    getOlderMessages().then((messages) => {
      setDATA(messages);
    });
  }, []);

  // Recieve real time messages
  useEffect(() => {
    socket.on("message", (data) => {
      setDATA((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  return (
    <StoreContext.Provider
      value={{
        participantView,
        setParticipantView,
        activeChat,
        setActiveChat,
        DATA,
        socket,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
