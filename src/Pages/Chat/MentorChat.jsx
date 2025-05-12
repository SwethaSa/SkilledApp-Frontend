import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./MentorChat.css";

const API = import.meta.env.VITE_API;

export default function MentorDashboard() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const scrollRef = useRef();
  const name = localStorage.getItem("name");

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });

    async function fetchChats() {
      const mentorId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${API}/chat?mentorId=${mentorId}`, {
          headers: { "x-auth-token": token },
        });
        const data = await res.json();
        setChats(data);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchChats();
  }, [messages]);

  const openChat = async (chat) => {
    setActiveChat(chat);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/chat/${chat._id}/messages`, {
        headers: { "x-auth-token": token },
      });
      const msgs = await res.json();
      setMessages(msgs);
      scrollRef.current?.scrollIntoView();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendReply = async () => {
    if (!reply.trim()) {
      toast.error("Cannot send an empty message");
      return;
    }
    const mentorId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/chat/${activeChat._id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify({ sender: mentorId, text: reply }),
      });
      const newMsg = await res.json();
      setMessages((prev) => [...prev, newMsg]);
      setReply("");
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      toast.success("Reply sent");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="mentor-dashboard-container">
        <div className="mentor-chat-list">
          {chats.map((chat) => {
            const other = chat.participants.find(
              (p) => p !== localStorage.getItem("userId")
            );
            return (
              <div
                key={chat._id}
                className="mentor-chat-item"
                onClick={() => openChat(chat)}
              >
                <span>{name}</span>
                {chat.unreadBy[localStorage.getItem("userId")] > 0 && (
                  <span className="mentor-unread-dot" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mentor-chat-panel">
          {activeChat ? (
            <>
              <div className="mentor-message-list">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`mentor-message ${
                      m.sender === localStorage.getItem("userId")
                        ? "outgoing"
                        : "incoming"
                    }`}
                  >
                    <p>{m.text}</p>
                    <small>{new Date(m.timestamp).toLocaleTimeString()}</small>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
              <div className="mentor-input-area">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type a reply..."
                />
                <button onClick={sendReply}>Send</button>
              </div>
            </>
          ) : (
            <div className="mentor-empty">Select a chat to view messages</div>
          )}
        </div>
      </div>
    </>
  );
}
