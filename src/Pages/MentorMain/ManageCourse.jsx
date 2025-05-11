import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../MentorCss/ManageCourse.css";
import { Toaster, toast } from "react-hot-toast";

const API = import.meta.env.VITE_API;

export default function ManageCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch(`${API}/course`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch courses");
        setCourses(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="create-course-container">Loading courses...</div>;
  }

  const grouped = courses.reduce((acc, course) => {
    (acc[course.topic] = acc[course.topic] || []).push(course);
    return acc;
  }, {});

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="create-course-container">
      <Toaster position="top-center" />
      <h2 className="section-title">All Courses</h2>
      {Object.entries(grouped).map(([topic, list]) => (
        <div key={topic} style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#555", marginBottom: "1rem" }}>{topic}</h3>
          <div
            className="modules-section"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {list.map((course) => (
              <div key={course._id} className="module-block">
                <h4 style={{ margin: "0 0 0.5rem 0" }}>{course.courseTitle}</h4>
                <p
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "0.9rem",
                    color: "#666",
                  }}
                >
                  {course.subTopic}
                </p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="submit-button"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}
                    onClick={() => navigate(`/update-course/${course._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="submit-button"
                    style={{
                      padding: "0.5rem 1rem",
                      fontSize: "0.9rem",
                      background: "#4caf50",
                    }}
                    onClick={() => handleOpenCourse(course._id)}
                  >
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
