import React from "react";
import { useNavigate } from "react-router-dom";
import Interface from "../../Components/Interface/Interface";
import "../DashboardCss/AllCourses.css";

function AllCourses() {
  const navigate = useNavigate();

  const handleNavigation = (topic) => {
    console.log("Clicked:", topic); // <-- Add this

    const path = topic.toLowerCase().replace(/\s+/g, "-");
    navigate(`/all-courses/${path}`);
  };

  return (
    <>
      <Interface
        title="All Courses"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="/assets/mycourse.svg"
      >
        <button className="topic-btn" onClick={() => handleNavigation("IT")}>
          IT
        </button>
        <button
          className="topic-btn"
          onClick={() => handleNavigation("Personal Growth")}
        >
          Personal Growth
        </button>
        <button
          className="topic-btn"
          onClick={() => handleNavigation("Finance")}
        >
          Finance
        </button>
        <button
          className="topic-btn"
          onClick={() => handleNavigation("Creative Skills")}
        >
          Creative Skills
        </button>
        <button
          className="topic-btn"
          onClick={() => handleNavigation("Language")}
        >
          Language
        </button>
      </Interface>
    </>
  );
}

export default AllCourses;
