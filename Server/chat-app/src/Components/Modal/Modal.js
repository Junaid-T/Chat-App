import React from "react";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { hideNewChatView } from "../../Actions/newChatAction";

const Modal = (props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(hideNewChatView());
  };
  return (
    <div onClick={handleClick} className={classes.Container}>
      {props.children}
    </div>
  );
};

export default Modal;
