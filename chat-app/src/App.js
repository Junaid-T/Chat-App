import { useState } from "react";

import "./App.css";
import Header from "./Components/Header/Header";
import SignIn from "./Components/Sign In/Sign-In";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const [signedIn, setSignedIn] = useState(false);

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
