import React from "react";
import "./CourseCard.css";

function CourseCard({ CourseTitle, CourseDesc, onOpen }) {
  return (
    <div className="course-card">
      <h3 className="course-title">{CourseTitle}</h3>
      <p className="course-description">{CourseDesc}</p>
      <button className="course-button" onClick={onOpen}>
        Open
      </button>
    </div>
  );
}

export default CourseCard;
