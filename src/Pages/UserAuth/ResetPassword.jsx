import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css"; // reuse styles
import resetSvg from "/assets/forgot.svg";

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

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

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

      if (res.ok) {
        toast.success(data.message, toastOptions);
        setTimeout(() => 2000);
        navigate("/login");
      } else {
        toast.error(
          data.message || "Reset link invalid or expired.",
          toastOptions
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.", toastOptions);
    }
  };

  return (
    <>
      <h1 onClick={() => navigate("/")} className="login-title">
        Skill'ED
      </h1>

      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Reset Password</h1>
          <img
            src={resetSvg}
            alt="Reset Password illustration"
            className="login-svg"
          />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">Enter your new password</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="New Password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
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
