import React from "react";
import Interface from "../../Components/Interface/Interface";
import LearningCard from "../../Components/LearningCard/LearningCard";
import CourseCard from "../../Components/CourseCard/CourseCard";
import "../DashboardCss/Dashboard.css";
function MyCourse() {
  const isNewUser = false;

  const courses = [
    { title: "JS Basics", completion: 20 },
    { title: "Mental Wellbeing", completion: 48 },
  ];

  return (
    <>
      <Interface
        title="My Course"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="./src/assets/mycourse.svg"
      >
        <div className="dashboard-content">
          {isNewUser ? (
            <>
              <h2 className="user-text">
                Hmm!! Looks Like you haven’t started anything yet.
              </h2>
              <div className="card-section">
                <h2 className="section-title">Explore All Courses</h2>
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
            </>
          ) : (
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
          )}
        </div>
      </Interface>
    </>
  );
}
export default MyCourse;
