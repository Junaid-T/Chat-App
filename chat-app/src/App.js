import "./App.css";
import Header from "./Components/Header/Header";
import SignIn from "./Components/Sign In/Sign-In";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loadChat, addToChat } from "./Actions/index";
import socketIOClient from "socket.io-client";
import { useEffect } from "react";

const socket = socketIOClient("http://127.0.0.1:3001", {
  query: { rooms: ["236236", "236263", "246324"], token: "12345" },
});

function App() {
  const signedIn = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("message", (data) => {
      dispatch(addToChat(data.room, data));
    });

    socket.on("oldMessages", (data) => {
      console.log(data);
      for (const room in data) {
        dispatch(loadChat(room, data[room]));
      }
    });

    socket.on("Auth Error", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="App">
      <Header handleClick={() => dispatch(logout())} />
      {signedIn ? (
        <Dashboard socket={socket} />
      ) : (
        <SignIn handleClick={() => dispatch(login())} />
      )}
    </div>
  );
}

export default App;
