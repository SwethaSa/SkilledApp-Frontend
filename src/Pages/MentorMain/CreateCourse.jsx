import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "../MentorCss/CreateCourse.css";

const API = import.meta.env.VITE_API;
const TOPIC_OPTIONS = [
  "IT",
  "Finance",
  "Language",
  "Creative Skills",
  "Personal Growth",
];

export default function CreateCourse() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

  const [topic, setTopic] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([{ moduleTitle: "", content: "" }]);

  const isFormValid =
    topic &&
    subTopic &&
    courseTitle &&
    modules.every((m) => m.moduleTitle && m.content);

  const handleAddModule = () => {
    setModules([...modules, { moduleTitle: "", content: "" }]);
  };

  const handleRemoveModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  const handleModuleChange = (index, field, value) => {
    const updated = modules.map((mod, i) =>
      i === index ? { ...mod, [field]: value } : mod
    );
    setModules(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill all required fields", toastOptions);
      return;
    }

    const payload = { topic, subTopic, courseTitle, description, modules };

    try {
      const response = await fetch(`${API}/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Course created successfully!", toastOptions);
        navigate("/mentor-dashboard");
      } else {
        toast.error(data.message || "Error creating course", toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  return (
    <div className="create-course-container">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="section-title">Create New Course</h2>
      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Topic*</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select Topic --
            </option>
            {TOPIC_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Sub-Topic*</label>
          <input
            type="text"
            placeholder="Enter sub-topic"
            value={subTopic}
            onChange={(e) => setSubTopic(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Title*</label>
          <input
            type="text"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={3}
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modules-section">
          <h3>Modules*</h3>
          {modules.map((mod, idx) => (
            <div key={idx} className="module-block">
              <input
                type="text"
                placeholder="Module Title"
                value={mod.moduleTitle}
                onChange={(e) =>
                  handleModuleChange(idx, "moduleTitle", e.target.value)
                }
                required
              />
              <textarea
                placeholder="Markdown Content"
                rows={6}
                value={mod.content}
                onChange={(e) =>
                  handleModuleChange(idx, "content", e.target.value)
                }
                required
              />
              {modules.length > 1 && (
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveModule(idx)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-btn"
            onClick={handleAddModule}
            disabled={!isFormValid}
          >
            + Add Module
          </button>
        </div>

        <button type="submit" className="submit-button" disabled={!isFormValid}>
          Create Course
        </button>
      </form>
    </div>
  );
}
