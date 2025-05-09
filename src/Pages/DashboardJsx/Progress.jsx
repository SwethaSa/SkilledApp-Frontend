import React from "react";
import Interface from "../../Components/Interface/Interface";
import PolarChart from "../../Components/Charts/PolarChart";
import AreaChart from "../../Components/Charts/AreaChart";
import "../DashboardCss/Progress.css";

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
        InterfaceImg="/assets/charts.svg"
      >
        <h2 className="user-text">
          Hmm!! Looks Like you haven’t started anything yet.
        </h2>
        <div className="progress-content">
          <PolarChart isNewUser={isNewUser} />

          <AreaChart isNewUser={isNewUser} />
        </div>
      </Interface>
    </>
  );
}

export default Progress;
