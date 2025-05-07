import React from "react";
import Interface from "../../Components/Interface/Interface";
import PolarChart from "../../Components/Charts/PolarChart";

function Progress() {
  const isNewUser = false;

  return (
    <>
      <Interface
        title="Progress"
        ButtonOne="Dashboard"
        ButtonTwo="My Course"
        ButtonThree="Progress"
        ButtonFour="Discussions"
        ButtonFive="All Courses"
        InterfaceImg="./src/assets/charts.svg"
      />
      <div
        className="dashboard-content"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {isNewUser ? <PolarChart /> : <PolarChart />}
      </div>
    </>
  );
}

export default Progress;
