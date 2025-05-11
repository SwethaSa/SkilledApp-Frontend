import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Interface from "../../Components/Interface/Interface";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CourseView.css";

function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progressObj, setProgressObj] = useState({});
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    async function fetchCourseAndProgress() {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const courseRes = await fetch(`${API}/course/${id}`);
        if (!courseRes.ok) throw new Error("Course not found");
        const courseData = await courseRes.json();

        const progressRes = await fetch(`${API}/progress/${userId}/${id}`, {
          headers: { "x-auth-token": token },
        });
        if (!progressRes.ok) throw new Error("Could not fetch progress");
        const { progress = {} } = await progressRes.json();

        const fullProgress = courseData.modules.map(
          (_, idx) => progress[idx] || false
        );
        const firstIncomplete = fullProgress.findIndex((done) => !done);
        const startIndex =
          firstIncomplete !== -1
            ? firstIncomplete
            : courseData.modules.length - 1;

        setCourse(courseData);
        setProgressObj(progress);
        setCurrentModuleIndex(startIndex);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCourseAndProgress();
  }, [id, userId, token, API]);

  const total = course?.modules.length || 0;
  const completedCount = Object.values(progressObj).filter(Boolean).length;
  const isCurrentDone = !!progressObj[currentModuleIndex];

  const handlePrev = () => setCurrentModuleIndex((i) => Math.max(0, i - 1));
  const handleNext = () =>
    setCurrentModuleIndex((i) => Math.min(total - 1, i + 1));

  const handleComplete = async () => {
    try {
      const res = await fetch(`${API}/progress/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({
          courseId: id,
          moduleIndex: currentModuleIndex,
          completed: true,
        }),
      });
      if (!res.ok) throw new Error("Failed to update progress");

      setProgressObj((p) => ({ ...p, [currentModuleIndex]: true }));

      setCurrentModuleIndex((i) => (i < course.modules.length - 1 ? i + 1 : i));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="loader">Loading course...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course?.modules?.length)
    return <div className="error">No modules available.</div>;

  const currentModule = course.modules[currentModuleIndex];
  const percent = Math.round((completedCount / total) * 100);

  return (
    <Interface
      title={`Course: ${course.courseTitle}`}
      InterfaceImg="/assets/allcourse.svg"
    >
      <div className="course-view-wrapper">
        <h2 className="course-subtitle">{course.subTopic}</h2>
        <p className="course-description">{course.description}</p>

        <div className="module-card">
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <div className="markdown-paragraph">{children}</div>
              ),
              h1: ({ children }) => (
                <h1 className="markdown-heading">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="markdown-heading">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="markdown-heading">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="markdown-list">{children}</ul>
              ),
              li: ({ children }) => (
                <li className="markdown-list-item">{children}</li>
              ),
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return inline ? (
                  <code className="inline-code">{children}</code>
                ) : (
                  <SyntaxHighlighter
                    style={okaidia}
                    language={match ? match[1] : "javascript"}
                    PreTag="div"
                    customStyle={{
                      background: "#1e1e2f",
                      color: "#c5e4fd",
                      borderRadius: "10px",
                      fontSize: "0.95rem",
                      padding: "1.2rem",
                      border: "1px solid #333",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      maxWidth: "50vw",
                    }}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {currentModule.content}
          </ReactMarkdown>

          <button
            className="nav-btn complete-btn"
            onClick={handleComplete}
            disabled={isCurrentDone}
          >
            {isCurrentDone ? "Completed" : "Mark as Completed"}
          </button>

          <div className="progress-bar-container">
            <div className="progress-label">{percent}% completed</div>
            <div className="progress-bar">
              <div
                className="progress-filled"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="module-nav-buttons">
          <button onClick={handlePrev} disabled={currentModuleIndex === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!isCurrentDone || currentModuleIndex === total - 1}
          >
            Next
          </button>
        </div>
      </div>
    </Interface>
  );
}

export default CourseView;
