import React from "react";
import "./Login.css";
import loginSvg from "/assets/forgot.svg";

function ForgotPassword() {
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

          <form className="login-form">
            <input type="email" placeholder="Email" required />
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
