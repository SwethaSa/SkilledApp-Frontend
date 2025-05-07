import React from "react";
import "./Login.css";
import loginSvg from "../../assets/login.svg";

function Login() {
  return (
    <>
      <h1 className="login-title">Skill'ED</h1>

      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Login</h1>
          <img src={loginSvg} alt="Login illustration" className="login-svg" />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">Hey, welcome back!</h2>

          <form className="login-form">
            <input type="text" placeholder="Username or Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>

          <p className="or">or</p>

          <button className="google-login">Login with Google</button>
          <button className="facebook-login">Login with Facebook</button>
        </div>
      </div>
      <div className="login-extras">
        <a href="/forgot-password">Forgot Password?</a>
        <a href="/signup">Don't have an account? Sign Up</a>
      </div>
    </>
  );
}

export default Login;
