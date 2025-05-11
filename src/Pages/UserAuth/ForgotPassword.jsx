import React, { useState } from "react";
import "./Login.css";
import loginSvg from "/assets/forgot.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_API;
    try {
      const res = await fetch(`${API}/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <h1 className="login-title">Skill'ED</h1>

      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Forgot Password</h1>
          <img
            src={loginSvg}
            alt="Forgot Password illustration"
            className="login-svg"
          />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">
            Hmm!! Let’s try to retrieve your account
          </h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="or">or</p>
          <div className="login-extras">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
