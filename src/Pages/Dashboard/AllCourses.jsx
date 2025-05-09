import React from "react";
import Interface from "../../Components/Interface/Interface";
import "./AllCourses.css";

function AllCourses() {
  return (
    <>
      <Interface
        title="All Courses"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="./src/assets/mycourse.svg"
      >
        <button className="topic-btn">It</button>
        <button className="topic-btn">Personal Growth</button>
        <button className="topic-btn">Finance</button>
        <button className="topic-btn">Creative Skills</button>
        <button className="topic-btn">Language</button>
      </Interface>
    </>
  );
}
export default AllCourses;
