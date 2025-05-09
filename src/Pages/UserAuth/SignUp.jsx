import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginSvg from "../../assets/signup.svg";
import GoogleAuth from "../../Components/Auth/GoogleAuth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_API;

    const response = await fetch(`${API}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      alert(data.message);
    }
  };

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
          <form className="login-form" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign Up</button>
          </form>
          <p className="or">or</p>
          <GoogleAuth authType="signup" />

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
