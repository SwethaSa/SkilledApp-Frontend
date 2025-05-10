import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Interface from "../../Components/Interface/Interface";
import CourseCard from "../../Components/CourseCard/CourseCard";
import "../DashboardCss/TopicCourse.css";

function TopicCourse() {
  const { topic } = useParams();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const formattedTopic = topic.replace(/-/g, " ");
    const API = import.meta.env.VITE_API;
    fetch(`${API}/course/topic/${formattedTopic}`)
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error loading courses:", err));
  }, [topic]);

  const handleOpenCourse = (courseId) => {
    navigate(`/course/${courseId}`);
  };

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
          <CourseCard
            key={course._id}
            CourseTitle={course.courseTitle}
            CourseDesc={course.description}
            onOpen={() => handleOpenCourse(course._id)}
          />
        ))}
      </div>
    </Interface>
  );
}

export default TopicCourse;
