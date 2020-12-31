import React from "react";
import classes from "./Sign-In.module.css";

const SignIn = (props) => {
  return (
    <div className={classes.Container}>
      <button className={classes.Button} onClick={props.handleClick}>
        <h2>Click here to sign in!</h2>
      </button>
    </div>
  );
};

export default SignIn;
