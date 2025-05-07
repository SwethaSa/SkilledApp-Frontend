import React from "react";
import Interface from "../../Components/Interface/Interface";

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
      />
    </>
  );
}
export default AllCourses;
