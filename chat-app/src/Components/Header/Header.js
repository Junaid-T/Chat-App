import React, { useContext } from "react";
import classes from "./Header.module.css";
import { StoreContext } from "../../Contexts/store";

import { useDispatch, useSelector } from "react-redux";
import {
  showParticipants,
  hideParticipants,
  activateChat,
  deactivateChat,
} from "../../Actions/index";

const Header = (props) => {
  const store = useContext(StoreContext);
  const dispatch = useDispatch();
  const participantView = useSelector((state) => state.participantView);
  const activeChat = useSelector((state) => state.activeChat);

  // const toggleView = () => {
  //   store.setParticipantView(!store.participantView);
  // };

  // const toggleView = () => {
  //   console.log(participantView);
  //   dispatch(toggleParticipants());
  // };

  // const backToDashboard = () => {
  //   store.setActiveChat(null);
  //   store.setParticipantView(false);
  // };
  const toggleView = () => {
    console.log(participantView);
    participantView
      ? dispatch(hideParticipants())
      : dispatch(showParticipants());
  };

  const backToDashboard = () => {
    dispatch(hideParticipants());
    dispatch(deactivateChat());
  };

  return (
    <div className={classes.Header}>
      <button onClick={activeChat ? backToDashboard : props.handleClick}>
        {activeChat ? "Dashboard" : "Sign Out"}
      </button>
      <h3>Chat Room</h3>
      <button
        className={classes.ParticipantButton}
        onClick={activeChat ? toggleView : null}
      >
        Participants
      </button>
    </div>
  );
};
//   return (
//     <div className={classes.Header}>
//       <button onClick={store.activeChat ? backToDashboard : props.handleClick}>
//         {store.activeChat ? "Dashboard" : "Sign Out"}
//       </button>
//       <h3>Chat Room</h3>
//       <button
//         className={classes.ParticipantButton}
//         onClick={store.activeChat ? toggleView : null}
//       >
//         Participants
//       </button>
//     </div>
//   );
// };

export default Header;
