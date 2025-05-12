import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./LearnerChat.css";

const API = import.meta.env.VITE_API;

function LearnerChat({ mentorId }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const toastOptions = {
    style: {
      border: "1px solid #ff5733",
      padding: "14px 16px",
      color: "#fff",
      background: "#ff5733",
      borderRadius: "10px",
      fontWeight: "500",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#F0EBFF",
    },
  };
  useEffect(() => {
    async function loadHistory() {
      const learnerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      try {
        const chatRes = await fetch(`${API}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
          body: JSON.stringify({ learnerId, mentorId }),
        });
        const { _id: chatId } = await chatRes.json();
        const msgRes = await fetch(`${API}/chat/${chatId}/messages`, {
          headers: { "x-auth-token": token },
        });
        const msgs = await msgRes.json();
        setMessages(msgs);
        scrollRef.current?.scrollIntoView();
      } catch (err) {
        toast.error(err.message, toastOptions);
      }
    }
    loadHistory();
  }, [mentorId]);

  const sendMessage = async () => {
    if (!text.trim()) {
      toast.error("Cannot send an empty message", toastOptions);
      return;
    }

    try {
      const learnerId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const chatRes = await fetch(`${API}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ learnerId, mentorId }),
      });
      const { _id: chatId } = await chatRes.json();

      const res = await fetch(`${API}/chat/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ sender: learnerId, text }),
      });
      const newMsg = await res.json();

      setMessages((prev) => [...prev, newMsg]);
      setText("");
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      toast.success("Message sent", toastOptions);
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card chat-card">
        <div className="card-header">
          <h2>Chat with Mentor</h2>
        </div>
        <div className="messages">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`message ${
                m.sender === localStorage.getItem("userId")
                  ? "sent"
                  : "received"
              }`}
            >
              <p className="msg">{m.text}</p>
              <small>{new Date(m.timestamp).toLocaleTimeString()}</small>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
        <div className="input-box">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default LearnerChat;
