import React, { useState, useEffect } from "react";
import Interface from "../../Components/Interface/Interface";
import CourseCard from "../../Components/CourseCard/CourseCard";
import LearningCard from "../../Components/LearningCard/LearningCard";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "../DashboardCss/Dashboard.css";

const API = import.meta.env.VITE_API;

function MyCourse() {
  const [continueCourses, setContinueCourses] = useState([]);
  const [exploreCourses, setExploreCourses] = useState([]);
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
    const fetchProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        const token = localStorage.getItem("token");

        const progRes = await fetch(`${API}/progress/user/${userId}`, {
          headers: { "x-auth-token": token },
        });
        if (!progRes.ok) throw new Error("Failed to fetch progress");
        const progressList = await progRes.json();

        const cont = await Promise.all(
          progressList.map(async (doc) => {
            const courseRes = await fetch(`${API}/course/${doc.courseId}`, {
              headers: { "x-auth-token": token },
            });
            const course = await courseRes.json();
            const done = Object.values(doc.progress || {}).filter(
              Boolean
            ).length;
            const total = course.modules.length;
            const completion = Math.floor((done / total) * 100);
            const resumeIndex = done < total ? done : total - 1;
            return {
              courseId: doc.courseId,
              title: course.courseTitle,
              completion,
              resumeIndex,
            };
          })
        );
        setContinueCourses(cont);

        const allRes = await fetch(`${API}/course`, {
          headers: { "x-auth-token": token },
        });
        if (!allRes.ok) throw new Error("Failed to fetch courses");
        const allCourses = await allRes.json();
        const firstByTopic = {};
        allCourses.forEach((c) => {
          if (c.topic && !firstByTopic[c.topic]) firstByTopic[c.topic] = c;
        });
        setExploreCourses(Object.values(firstByTopic));
      } catch (err) {
        console.error(err);
        toast.error("Unable to load courses. Please try again.", toastOptions);
      }
    };
    fetchProgress();
  }, []);

  const handleResume = (id, idx) => {
    toast.success(`Resuming course`, toastOptions);
    navigate(`/course/${id}?module=${idx}`);
  };

  const handleOpen = (id) => {
    toast.success(`Opening course`, toastOptions);
    navigate(`/course/${id}`);
  };
  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const inProgress = continueCourses.filter((c) => c.completion < 100);
  const completed = continueCourses.filter((c) => c.completion === 100);

  return (
    <>
      <Interface
        title="My Course"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="/assets/mycourse.svg"
      >
        <div className="dashboard-content">
          {continueCourses.length > 0 ? (
            <>
              {inProgress.length > 0 && (
                <div className="card-section">
                  <div className="continue-learning">
                    <h2 className="section-title">Continue Learning</h2>
                    <div className="learning-card-list">
                      {inProgress.map((course, idx) => (
                        <LearningCard
                          key={idx}
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
              )}

              {completed.length > 0 && (
                <div className="card-section">
                  <h2 className="section-title">Completed Courses</h2>
                  <div className="learning-card-list">
                    {completed.map((course, idx) => (
                      <LearningCard
                        key={idx}
                        title={course.title}
                        completion={course.completion}
                        onClick={() => handleOpen(course.courseId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="user-text">
                Hmm!! Looks Like you haven’t started anything yet.
              </h2>
              <div className="card-section">
                <h2 className="section-title">Explore All Courses</h2>
                <div className="cards-grid">
                  {exploreCourses.map((course) => (
                    <CourseCard
                      key={course._id}
                      CourseImg={course.image || "/assets/default.svg"}
                      CourseTitle={course.courseTitle}
                      CourseDesc={course.description || ""}
                      onOpen={() => handleOpenCourse(course._id)}
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

export default MyCourse;
