import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Login.css";
import loginSvg from "/assets/forgot.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");

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

      setTimeout(() => {
        if (res.ok) {
          toast.success(
            data.message || "Reset link sent to your email.",
            toastOptions
          );
        } else {
          toast.error(
            data.message || "Failed to send reset link.",
            toastOptions
          );
        }
      }, 200);
    } catch (error) {
      setTimeout(() => {
        toast.error("Something went wrong. Please try again.", toastOptions);
      }, 200);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

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
