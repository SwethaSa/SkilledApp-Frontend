import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import loginSvg from "/assets/login.svg";
import GoogleAuth from "../../Components/Auth/GoogleAuth";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token) {
      toast.success("You're already logged in!");
      navigate("/dashboard");
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    const API = import.meta.env.VITE_API;

    try {
      const response = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );

        toast.success("Login successful 🎉", toastOptions);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(data.message || "Invalid Credentials ❌", toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later", toastOptions);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <h1 onClick={() => navigate("/")} className="login-title">
        Skill'ED
      </h1>
      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">Login</h1>
          <img src={loginSvg} alt="Login illustration" className="login-svg" />
        </div>

        <div className="vertical-line"></div>

        <div className="login-card">
          <h2 className="login-heading">Hey, welcome back!</h2>
          <div className="login-info-box">
  <p><strong>For accessing mentor portal:</strong></p>
  <p>Email: <code>swethasakthi1227@gmail.com</code></p>
  <p>Password: <code>Admin@123</code></p>
</div>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
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
          <GoogleAuth authType="login" />
        </div>
      </div>

     <div className="login-extras">
  <Link to="/forgot-password">Forgot Password?</Link>
  <Link to="/signup">Don't have an account? Sign Up</Link>
</div>
    </>
  );
}

export default Login;
