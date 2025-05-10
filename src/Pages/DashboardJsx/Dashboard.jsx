import React, { useState, useEffect } from "react";
import Interface from "../../Components/Interface/Interface";
import CourseCard from "../../Components/CourseCard/CourseCard";
import LearningCard from "../../Components/LearningCard/LearningCard";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "../DashboardCss/Dashboard.css";

const API = import.meta.env.VITE_API;

function Dashboard() {
  const [continueCourses, setContinueCourses] = useState([]);
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);

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
    const fetchContinueLearning = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const token = localStorage.getItem("token");
        const res = await fetch(`${API}/progress/user/${userId}`, {
          headers: { "x-auth-token": token },
        });
        if (!res.ok) throw new Error("Failed to fetch progress");
        const progressList = await res.json();

        const data = await Promise.all(
          progressList.map(async (doc) => {
            const courseRes = await fetch(`${API}/course/${doc.courseId}`, {
              headers: { "x-auth-token": token },
            });
            if (!courseRes.ok) throw new Error("Failed to fetch course");
            const course = await courseRes.json();

            const completedCount = Object.values(doc.progress || {}).filter(
              Boolean
            ).length;
            const totalModules = course.modules.length;
            const completionPercent = Math.floor(
              (completedCount / totalModules) * 100
            );
            const resumeIndex =
              completedCount < totalModules ? completedCount : totalModules - 1;

            return {
              courseId: doc.courseId,
              title: course.courseTitle,
              completion: completionPercent,
              resumeIndex,
            };
          })
        );

        setContinueCourses(data);
        const allRes = await fetch(`${API}/course`, {
          headers: { "x-auth-token": token },
        });
        if (!allRes.ok) throw new Error("Failed to fetch all courses");
        const allCourses = await allRes.json();

        // Filter out courses already learning
        const learningIds = new Set(data.map((c) => c.courseId));
        const filtered = allCourses.filter((c) => !learningIds.has(c._id));

        // Randomize and pick 3
        for (let i = filtered.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
        }
        setRecommended(filtered.slice(0, 3));
        const firstByTopic = {};
        allCourses.forEach((c) => {
          if (c.topic && !firstByTopic[c.topic]) {
            firstByTopic[c.topic] = c;
          }
        });
        setExploreCourses(Object.values(firstByTopic));
      } catch (error) {
        console.error(error);
        toast.error("Failed to load courses. Please try again.", toastOptions);
      }
    };

    fetchContinueLearning();
  }, []);

  const handleResume = (courseId, resumeIndex) => {
    toast.success(`Resuming course`, toastOptions);
    navigate(`/course/${courseId}?module=${resumeIndex}`);
  };

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <Interface
        title="Dashboard"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="/assets/dashboard.svg"
      >
        <div className="dashboard-content">
          {continueCourses.length > 0 ? (
            <>
              <div className="card-section">
                <div className="continue-learning">
                  <h2 className="section-title">Continue Learning</h2>
                  <div className="learning-card-list">
                    {continueCourses.map((course) => (
                      <LearningCard
                        key={course.courseId}
                        title={course.title}
                        completion={course.completion}
                        onClick={() =>
                          handleResume(course.courseId, course.resumeIndex)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-section">
                <h2 className="section-title">You might Like</h2>
                <div className="cards-grid">
                  {recommended.map((course) => (
                    <CourseCard
                      key={course._id}
                      CourseTitle={course.courseTitle}
                      CourseDesc={course.description || ""}
                      onOpen={() => handleOpenCourse(course._id)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card-section">
                <h2 className="section-title">Explore All</h2>
                <div className="cards-grid">
                  {exploreCourses.map((course) => (
                    <CourseCard
                      key={course._id}
                      CourseImg={course.image || "/assets/default.svg"}
                      CourseTitle={course.courseTitle}
                      CourseDesc={course.description || ""}
                      onClick={() => handleOpen(course._id)}
                    />
                  ))}
                </div>
              </div>
              <div className="card-section">
                <h2 className="section-title">Recommended For You</h2>
                <div className="cards-grid">
                  {recommended.map((course) => (
                    <CourseCard
                      key={course._id}
                      CourseImg={course.image || "/assets/default.svg"}
                      CourseTitle={course.courseTitle}
                      CourseDesc={course.description || ""}
                      onClick={() => handleOpen(course._id)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Interface>
      <Toaster />
    </>
  );
}

export default Dashboard;
