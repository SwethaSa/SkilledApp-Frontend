import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./Login.css";
import loginSvg from "/assets/forgot.svg";

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

function ForgotPassword() {
  const [email, setEmail] = useState("");

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

      if (res.ok) {
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message || "Something went wrong.", toastOptions);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.", toastOptions);
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
