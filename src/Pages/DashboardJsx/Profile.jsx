import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../DashboardCss/Profile.css";

const API = import.meta.env.VITE_API;

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("Fetching profile", { API, userId, token });
    if (!token || !userId) return navigate("/login");

    fetch(`${API}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Failed to fetch profile (${res.status}): ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: "",
        });
      })
      .catch((err) => {
        console.error("Fetch profile error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [navigate, token, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    const payload = Object.fromEntries(
      Object.entries(userData).filter(([_, v]) => v)
    );

    try {
      const res = await fetch(`${API}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Update failed (${res.status}): ${msg}`);
      }
      alert("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?"))
      return;
    setError(null);

    try {
      const res = await fetch(`${API}/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Delete failed (${res.status}): ${msg}`);
      }
      localStorage.clear();
      navigate("/signup");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <form onSubmit={handleUpdate} className="profile-form">
        {["name", "email", "phone", "password"].map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field} className="form-label">
              {field === "password"
                ? "New Password"
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={
                field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : "text"
              }
              name={field}
              value={userData[field]}
              onChange={handleChange}
              className="form-input"
              placeholder={
                field === "password" ? "Leave blank to keep current" : ""
              }
              required={field !== "password"}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-update">
          Update Profile
        </button>
      </form>
      <button onClick={handleDelete} className="btn btn-delete">
        Delete Account
      </button>
    </div>
  );
};

export default Profile;
