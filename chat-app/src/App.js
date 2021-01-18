import "./App.css";
import Header from "./Components/Header/Header";
import SignIn from "./Components/Sign In/Sign-In";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { loadChat, addToChat } from "./Actions/messageActions";
import { loginSuccess } from "./Actions/authActions";
import {
  addParticipant,
  removeParticipants,
} from "./Actions/participantActions";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";

const token = localStorage.getItem("token");
const socket = socketIOClient("http://127.0.0.1:3001", {
  query: {
    token,
  },
});

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addToChat(data.room, data));
    });

    socket.on("user", (data) => {
      dispatch(loginSuccess(data.user));
      for (const room in data.messages) {
        dispatch(loadChat(room, data.messages[room]));
      }
    });

    socket.on("createSuccess", (data) => {
      // NEW ROOM HAS BEEN CREATED AND USER ADDED TO IT
      dispatch(loadChat(data.id, [{ name: data.name }]));
      console.log(data);
    });

    socket.on("userJoined", (data) => {
      dispatch(addParticipant(data.name, data.chat));
      console.log(data);
    });

    socket.on("userLeft", (data) => {
      dispatch(removeParticipants(data.name, data.chat));
      console.log(data);
    });

    socket.on("Auth Error", (data) => {
      console.log(data);
    });

    socket.on("Error", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <Header socket={socket} />
      {auth.isAuth ? <Dashboard socket={socket} /> : <SignIn />}
    </div>
  );
}

export default App;
