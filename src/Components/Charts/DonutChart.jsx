import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, Tooltip);

const DonutChart = ({ percentage = 75 }) => {
  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#FF5733", "#FFD1C1"],
        borderWidth: 0,
        cutout: "70%", // For center space
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ position: "relative", width: 200, height: 200 }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#FF5733",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default DonutChart;
