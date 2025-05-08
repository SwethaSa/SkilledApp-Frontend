import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const AreaChart = ({ isNewUser }) => {
  const progress = isNewUser ? [0, 0, 0, 0, 0] : [20, 40, 60, 75, 90];

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Now"],
    datasets: [
      {
        label: "Progress",
        data: progress,
        fill: true,
        backgroundColor: "rgba(255, 87, 51, 0.2)",
        borderColor: "#FF5733",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
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
          <Line data={data} options={options} />
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
          Weekly Progress
        </p>
      </div>
    </>
  );
};

export default AreaChart;
