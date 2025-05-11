import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./Login.css";
import loginSvg from "/assets/forgot.svg";

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = import.meta.env.VITE_API;

    try {
      const res = await fetch(`${API}/users/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      setTimeout(() => {
        if (res.ok) {
          toast.success(data.message || "Password reset successfully.");
        } else {
          toast.error(data.message || "Password reset failed.");
        }
      }, 200);
    } catch (error) {
      setTimeout(() => {
        toast.error("Something went wrong. Please try again.");
      }, 200);
    }
  };

  return (
    <>
      <h1 className="login-title">Skill'ED</h1>

      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Reset Password</h1>
          <img
            src={loginSvg}
            alt="Reset Password illustration"
            className="login-svg"
          />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">Reset your password</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset</button>
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

export default ResetPassword;
