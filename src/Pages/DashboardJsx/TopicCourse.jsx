import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Interface from "../../Components/Interface/Interface";
import "../DashboardCss/TopicCourse.css";

function TopicCourse() {
  const { topic } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const formattedTopic = topic.replace(/-/g, " ");
    fetch(`http://localhost:4000/courses/topic/${formattedTopic}`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, [topic]);

  return (
    <Interface
      title={`${topic
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())} Courses`}
      ButtonOne="Dashboard"
      ButtonTwo="My Course"
      ButtonThree="Progress"
      ButtonFour="Discussions"
      ButtonFive="All Courses"
      InterfaceImg="/assets/allcourse.svg"
    >
      <div className="topic-course-wrapper">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <h3>{course.courseTitle}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </Interface>
  );
}

export default TopicCourse;
