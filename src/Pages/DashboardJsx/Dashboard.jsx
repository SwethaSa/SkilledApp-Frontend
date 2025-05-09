import React from "react";
import { useState, useEffect } from "react";
import Interface from "../../Components/Interface/Interface";
import CourseCard from "../../Components/CourseCard/CourseCard";
import LearningCard from "../../Components/LearningCard/LearningCard";
import { useNavigate } from "react-router-dom";
import "../DashboardCss/Dashboard.css";

function Dashboard() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const newUserFlag = localStorage.getItem("isNewUser");
    setIsNewUser(newUserFlag === "true");

    setCourses([
      { title: "JS Basics", completion: 20 },
      { title: "Mental Wellbeing", completion: 48 },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isNewUser");
    navigate("/login");
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
        InterfaceImg="./src/assets/dashboard.svg"
      >
        <div className="dashboard-content">
          {isNewUser ? (
            <>
              <div className="card-section">
                <h2 className="section-title">Explore All</h2>
                <div className="cards-grid">
                  <CourseCard
                    CourseImg="./src/assets/one.svg"
                    CourseTitle="Course 1"
                    CourseDesc="This is a description of course 1."
                  />
                  <CourseCard
                    CourseImg="./src/assets/yoga.svg"
                    CourseTitle="Course 2"
                    CourseDesc="This is a description of course 2."
                  />
                  <CourseCard
                    CourseImg="./src/assets/brain.svg"
                    CourseTitle="Course 3"
                    CourseDesc="This is a description of course 3."
                  />
                  <CourseCard
                    CourseImg="./src/assets/creator.svg"
                    CourseTitle="Course 4"
                    CourseDesc="This is a description of course 4."
                  />
                </div>
              </div>

              <div className="card-section">
                <h2 className="section-title">Recommended For You</h2>
                <div className="cards-grid">
                  <CourseCard
                    CourseImg="./src/assets/brain.svg"
                    CourseTitle="Focus Mastery"
                    CourseDesc="Improve your attention and mental clarity."
                  />
                  <CourseCard
                    CourseImg="./src/assets/yoga.svg"
                    CourseTitle="Morning Yoga"
                    CourseDesc="Start your day with mindful movement."
                  />
                  <CourseCard
                    CourseImg="./src/assets/handcoding.svg"
                    CourseTitle="JS Crash Course"
                    CourseDesc="Learn JavaScript with real-world tasks."
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card-section">
                <div className="continue-learning">
                  <h2 className="section-title">Continue Learning</h2>
                  <div className="learning-card-list">
                    {courses.map((course, index) => (
                      <LearningCard
                        key={index}
                        title={course.title}
                        completion={course.completion}
                        onClick={() => alert(`Resuming ${course.title}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-section">
                <h2 className="section-title">You might Like</h2>
                <div className="cards-grid">
                  <CourseCard
                    CourseImg="./src/assets/brain.svg"
                    CourseTitle="Focus Mastery"
                    CourseDesc="Improve your attention and mental clarity."
                  />
                  <CourseCard
                    CourseImg="./src/assets/yoga.svg"
                    CourseTitle="Morning Yoga"
                    CourseDesc="Start your day with mindful movement."
                  />
                  <CourseCard
                    CourseImg="./src/assets/handcoding.svg"
                    CourseTitle="JS Crash Course"
                    CourseDesc="Learn JavaScript with real-world tasks."
                  />
                </div>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </Interface>
    </>
  );
}

export default Dashboard;
