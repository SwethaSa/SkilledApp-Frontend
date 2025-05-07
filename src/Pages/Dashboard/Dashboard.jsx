import React from "react";
import Interface from "../../Components/Interface/Interface";
import CourseCard from "../../Components/CourseCard/CourseCard";
import "./Dashboard.css"; // Create this

function Dashboard() {
  const isNewUser = true; // You can later set this from props or context

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
                    CourseImg="./src/assets/two.svg"
                    CourseTitle="Course 2"
                    CourseDesc="This is a description of course 2."
                  />
                  <CourseCard
                    CourseImg="./src/assets/three.svg"
                    CourseTitle="Course 3"
                    CourseDesc="This is a description of course 3."
                  />
                  <CourseCard
                    CourseImg="./src/assets/four.svg"
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
            <div className="card-section">
              <h2 className="section-title">Welcome Back!</h2>
              {/* Render enrolled courses or progress tracking */}
              <p className="welcome-text">Continue where you left off...</p>
            </div>
          )}
        </div>
      </Interface>
    </>
  );
}

export default Dashboard;
