import React, { useState, useEffect } from "react";
import Interface from "../../Components/Interface/Interface";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "../DashboardCss/Discussion.css";

function Discussion() {
  return (
    <>
      <Interface
        title="Discussion"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="./src/assets/discussion.svg"
      ></Interface>
    </>
  );
}

export default Discussion;
