import React, { useState, createContext } from "react";

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [participantView, setParticipantView] = useState(false);
  const [activeChat, setActiveChat] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        participantView,
        setParticipantView,
        activeChat,
        setActiveChat,
      }}
    >
      {props.children}
    </StoreContext.Provider>
  );
};
