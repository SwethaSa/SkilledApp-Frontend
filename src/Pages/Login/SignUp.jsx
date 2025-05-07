import React from "react";
import "./Login.css";
import loginSvg from "../../assets/signup.svg";

function Signup() {
  return (
    <>
      <h1 className="login-title">Skill'ED</h1>

      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Sign Up</h1>
          <img
            src={loginSvg}
            alt="Sign Up illustration"
            className="login-svg"
          />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">Hey, can’t wait to take you in!</h2>

          <form className="login-form">
            <input type="text" placeholder="Name" required />
            <input type="tel" placeholder="Phone" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>

          <p className="or">or</p>

          <button className="google-login">Sign up with Google</button>
          <button className="facebook-login">Sign up with Facebook</button>
        </div>
      </div>
      <div className="login-extras">
        <a href="/login">Already have an account? Login</a>
      </div>
    </>
  );
}

export default Signup;
