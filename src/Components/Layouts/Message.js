import React from "react";
import "./Message.css";

const Message = props => {
  return <div className={props.type}>{props.text}</div>;
};

export default Message;
