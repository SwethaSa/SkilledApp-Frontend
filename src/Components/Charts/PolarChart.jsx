import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarChart = () => {
  const data = {
    labels: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    datasets: [
      {
        label: "Skill Level",
        data: [80, 65, 90, 70, 50],
        backgroundColor: [
          "rgba(255, 87, 51, 0.7)",
          "rgba(255, 111, 97, 0.7)",
          "rgba(255, 159, 128, 0.7)",
          "rgba(255, 205, 178, 0.7)",
          "rgba(255, 238, 221, 0.7)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    animation: {
      duration: 1500,
      easing: "easeInOutQuart",
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "350px",
        margin: "auto",
        background: "#fff5f2",
        borderRadius: "16px",
        padding: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default PolarChart;
