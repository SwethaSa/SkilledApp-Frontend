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

const PolarChart = ({ isNewUser }) => {
  const data = {
    labels: ["IT", "Personal Growth", "Finance", "Language", "Creative Skills"],
    datasets: [
      {
        label: "Skill Level",
        data: isNewUser ? [0, 0, 0, 0, 0] : [80, 65, 90, 70, 50], // ✅ Conditional data
        backgroundColor: [
          "rgba(255, 87, 51, 0.7)",
          "rgba(255, 111, 97, 0.7)",
          "rgba(255, 159, 128, 0.7)",
          "rgba(255, 205, 178, 0.7)",
          "rgba(255, 87, 51, 1)",
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
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          margin: "auto",
        }}
      >
        <div
          style={{
            height: "350px",
            background: "#fff5f2",
            borderRadius: "16px",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <PolarArea data={data} options={options} />
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: "0.75rem",
            fontWeight: "500",
            fontSize: "1.05rem",
            color: "#333",
            fontFamily: "Kite One",
          }}
        >
          Skill Distribution
        </p>
      </div>
    </>
  );
};

export default PolarChart;
