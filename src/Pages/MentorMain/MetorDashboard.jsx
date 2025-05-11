import React from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "../MentorCss/MentorDashboard.css";

function MentorDashboard() {
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* Card 1: Manage Courses */}
      <div className="mentor-bg-courses">
        <div className="dashboard-content">
          <div className="mentor-section">
            <h2 className="section-title">Manage Courses</h2>
            <div className="mentors-grid">
              <div
                className="mentor-card"
                onClick={() => navigate("/create-course")}
              >
                Create
              </div>
              <div
                className="mentor-card"
                onClick={() => navigate("/manage-course")}
              >
                Update
              </div>
              <div
                className="mentor-card"
                onClick={() => navigate("/manage-course")}
              >
                Delete
              </div>
              <div
                className="mentor-card"
                onClick={() => navigate("/manage-course")}
              >
                All
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Discussions */}
      <div className="mentor-bg-discussions">
        <div className="dashboard-content">
          <div className="mentor-section">
            <h2 className="section-title">Discussions</h2>
            <div className="mentors-grid">
              <div
                className="mentor-card"
                onClick={() => navigate("/mentor-chats")}
              >
                Discussion
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MentorDashboard;
