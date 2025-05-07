import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Interface.css";

function Interface({ title, InterfaceImg, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 830);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 830) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Course", path: "/my-course" },
    { label: "Progress", path: "/progress" },
    { label: "Discussion", path: "/discussion" },
    { label: "All Courses", path: "/all-courses" },
  ];

  return (
    <div className="interface-container">
      {sidebarOpen && (
        <div className="interface-card">
          <h2 className="interface-card-title">Skilled</h2>
          {navItems.map((item) => (
            <React.Fragment key={item.path}>
              <hr className="nav-divider" />
              <h3
                className={`subtitle-btn ${
                  currentPath === item.path ? "active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </h3>
            </React.Fragment>
          ))}
          <hr className="nav-divider" />
        </div>
      )}

      <div className="interface-main">
        <div className="interface-header">
          {window.innerWidth < 830 && (
            <div
              className="hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </div>
          )}
          <h1 className="interface-title">{title}</h1>
          <div className="profile-icon" />
        </div>
        {children}
        <img
          src="./src/assets/Ellipse3.svg"
          alt="Ellipse"
          className="ellipse"
        />
        <img src={InterfaceImg} alt="dashboard" className="dashboard-svg" />
      </div>
    </div>
  );
}

export default Interface;
