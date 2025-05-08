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
import "./Discussion.css";

function Discussion() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const chatClient = StreamChat.getInstance("YOUR_API_KEY"); // Replace with your API key
    const channel = chatClient.channel("messaging", "general"); // Channel setup

    setClient(chatClient);
    setChannel(channel);

    channel.watch(); // Watch the channel for updates

    return () => {
      chatClient.disconnect();
    };
  }, []);

  if (!client || !channel) {
    return <div>Loading...</div>;
  }

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
      >
        <div className="discussion-card">
          <Chat client={client}>
            <Channel channel={channel}>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Channel>
          </Chat>
        </div>
      </Interface>
    </>
  );
}

export default Discussion;
