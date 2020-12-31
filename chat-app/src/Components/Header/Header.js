import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <button onClick={props.handleClick}>Sign Out</button>
      <h3>The Bestest Chat</h3>
      <button>Particapents</button>
    </div>
  );
};

export default Header;
