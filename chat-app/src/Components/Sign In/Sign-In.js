import React, { useState } from "react";
import classes from "./Sign-In.module.css";
import axios from "axios";

const SignIn = (props) => {
  const [loginMode, setLoginMode] = useState(true);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const login = (e) => {
    e.preventDefault();
    const res = axios.get("http://127.0.0.1:3001/api/v1/user/login", {});

    res().then((data) => console.log(data));
  };

  const loginForm = (
    <form className={classes.LoginForm}>
      <label for="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>
      <div className={classes.ErrorMessage}>%%ERROR PLACEHOLDER%%</div>
      <label for="password">Password</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
      ></input>
      <div className={classes.ErrorMessage}>%%ERROR PLACEHOLDER%%</div>

      <button>Login</button>
    </form>
  );

  const registerForm = (
    <form className={classes.RegisterForm}>
      <label for="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>
      <div className={classes.ErrorMessage}>%%ERROR PLACEHOLDER%%</div>

      <label for="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <div className={classes.ErrorMessage}>%%ERROR PLACEHOLDER%%</div>

      <label for="confirmPassword">Confirm Password</label>
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
      ></input>
      <div className={classes.ErrorMessage}>%%ERROR PLACEHOLDER%%</div>

      <button>Sign Up</button>
    </form>
  );

  const switchText = () => {
    return loginMode ? (
      <p className={classes.SwitchText}>
        Don't have an account, click{" "}
        <u onClick={() => setLoginMode(false)}>here</u> to sign up{" "}
      </p>
    ) : (
      <p className={classes.SwitchText}>
        Already have an account, click{" "}
        <u onClick={() => setLoginMode(true)}>here</u> to login{" "}
      </p>
    );
  };
  return (
    <div className={classes.Container}>
      {loginMode ? loginForm : registerForm}
      {switchText()}
      <button className={classes.Button} onClick={props.handleClick}>
        <h2>Click here to sign in!</h2>
      </button>
    </div>
  );
};

export default SignIn;
