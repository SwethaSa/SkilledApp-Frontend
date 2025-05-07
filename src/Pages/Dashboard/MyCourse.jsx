import React from "react";
import Interface from "../../Components/Interface/Interface";

function MyCourse() {
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
      />
    </>
  );
}
export default MyCourse;
