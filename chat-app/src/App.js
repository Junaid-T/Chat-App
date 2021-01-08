import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Header from "./Components/Header/Header";
import SignIn from "./Components/Sign In/Sign-In";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loadChat } from "./Actions/index";

function App() {
  // const [signedIn, setSignedIn] = useState(false);
  const signedIn = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(signedIn);

  useEffect(() => {
    const TEMP_URL = "http://127.0.0.1:3001/api/v1/chat";

    const getOlderMessages = async () => {
      const olderMessages = await axios.get(TEMP_URL);
      return olderMessages.data.data;
    };

    getOlderMessages().then((data) => {
      dispatch(loadChat(data.id, data.messages)); //
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Header handleClick={() => dispatch(logout())} />
      {signedIn ? (
        <Dashboard />
      ) : (
        <SignIn handleClick={() => dispatch(login())} />
      )}
    </div>
  );
  // return (
  //   <div className="App">
  //     <Header handleClick={() => setSignedIn(false)} />
  //     {signedIn ? (
  //       <Dashboard />
  //     ) : (
  //       <SignIn handleClick={() => setSignedIn(true)} />
  //     )}
  //   </div>
  // );
}

export default App;
