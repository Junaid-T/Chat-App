import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import "./App.css";
import Header from "./Components/Header/Header";
import SignIn from "./Components/Sign In/Sign-In";
import Dashboard from "./Components/Dashboard/Dashboard";

const socket = socketIOClient("http://127.0.0.1:3001");

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [DATA, setDATA] = useState([]);

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

  useEffect(() => {
    socket.on("message", (data) => {
      setDATA((prev) => {
        return [...prev, data];
      });
    });
  }, []);

  //   return (
  //     <div className="App">
  //       <Header handleClick={() => setSignedIn(false)} />
  //       {signedIn ? (
  //         <Main data={DATA} socket={socket} />
  //       ) : (
  //         <SignIn handleClick={() => setSignedIn(true)} />
  //       )}
  //     </div>
  //   );
  // }
  return (
    <div className="App">
      <Header handleClick={() => setSignedIn(false)} />
      {signedIn ? (
        <Dashboard />
      ) : (
        <SignIn handleClick={() => setSignedIn(true)} />
      )}
    </div>
  );
}

export default App;
