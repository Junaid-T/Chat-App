import React, { useState } from "react";
import classes from "./Sign-In.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Actions/index";
import * as authActions from "../../Actions/authActions";

const SignIn = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loginMode, setLoginMode] = useState(true);

  const [name, SetName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const loginReq = async (email, password) => {
    //dispatch(authActions.userLoading());
    try {
      const res = await axios.post("http://127.0.0.1:3001/api/v1/user/login", {
        email: email,
        password: password,
      });
      if (res.status !== 200) {
        throw new Error();
      }
      await localStorage.setItem("token", res.headers.token);
      //dispatch(authActions.loginSuccess());
      window.location.reload();
    } catch (err) {
      dispatch(authActions.loginFail());
    }
  };

  const regReq = async (name, email, password, confirmPassword) => {
    if (password !== confirmPassword) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:3001/api/v1/user/register",
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      await localStorage.setItem("token", res.headers.token);
      window.location.reload();
    } catch (err) {
      dispatch(authActions.registerFail());
    }
  };

  const loginForm = (
    <form className={classes.LoginForm}>
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>

      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
      ></input>
      <div
        className={
          auth.hasError ? classes.ErrorMessage : classes.ErrorMessageHidden
        }
      >
        Email or password is incorrect
      </div>

      <div className={classes.Submit} onClick={() => loginReq(email, password)}>
        Login
      </div>
    </form>
  );

  const registerForm = (
    <form className={classes.RegisterForm}>
      <label htmlFor="name">Name</label>
      <input
        onChange={(e) => SetName(e.target.value)}
        id="name"
        type="text"
      ></input>
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        type="text"
      ></input>
      <div
        className={
          auth.hasError ? classes.ErrorMessage : classes.ErrorMessageHidden
        }
      >
        %%ERROR PLACEHOLDER%%
      </div>

      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      ></input>
      <div>
        Password must be at least 8 characters, with at least 1 number, upper
        and lowercase letters
      </div>

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        onChange={(e) => setConfirmPassword(e.target.value)}
        type="password"
      ></input>
      <div
        className={
          auth.hasError ? classes.ErrorMessage : classes.ErrorMessageHidden
        }
      >
        %%ERROR PLACEHOLDER%%
      </div>

      <div
        className={classes.Submit}
        onClick={() => regReq(name, email, password, confirmPassword)}
      >
        Sign Up
      </div>
    </form>
  );

  const switchText = () => {
    return loginMode ? (
      <p className={classes.SwitchText}>
        Don't have an account, click{" "}
        <u style={{ cursor: "pointer" }} onClick={() => setLoginMode(false)}>
          here
        </u>{" "}
        to sign up{" "}
      </p>
    ) : (
      <p className={classes.SwitchText}>
        Already have an account, click{" "}
        <u style={{ cursor: "pointer" }} onClick={() => setLoginMode(true)}>
          here
        </u>{" "}
        to login{" "}
      </p>
    );
  };
  return (
    <div className={classes.Container}>
      {loginMode ? loginForm : registerForm}
      {switchText()}
      <button className={classes.Button}>
        <h2 onClick={() => loginReq("test@test.com", "Password")}>
          Click here to sign in!
        </h2>
      </button>
    </div>
  );
};

export default SignIn;
