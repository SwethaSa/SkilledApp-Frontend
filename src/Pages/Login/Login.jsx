import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginSvg from "../../assets/login.svg";
import GoogleAuth from "../../Components/Auth/GoogleAuth";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_API;

    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log(data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

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
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          <p className="or">or</p>
          <GoogleAuth />
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
