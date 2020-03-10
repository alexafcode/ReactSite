import React from "react";
import "./Message.css";

const Message = ({ type, text }) => {
  return <div className={type}>{text}</div>;
};

export default Message;
