import React from "react";
import "./CourseCard.css";

function CourseCard({ CourseImg, CourseTitle, CourseDesc }) {
  return (
    <div className="course-card">
      <div className="course-img-container">
        <img src={CourseImg} alt="course-img" className="course-img" />
      </div>
      <h3 className="course-title">{CourseTitle}</h3>
      <p className="course-description">{CourseDesc}</p>
      <button className="course-button">Open</button>
    </div>
  );
}

export default CourseCard;
