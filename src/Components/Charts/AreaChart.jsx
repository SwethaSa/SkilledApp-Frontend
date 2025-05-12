import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

const API = import.meta.env.VITE_API;

export default function ModulesOverTimeChart() {
  const [labels, setLabels] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    async function fetchCompletionTimestamps() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const res = await fetch(`${API}/progress/user/${userId}`, {
        headers: { "x-auth-token": token },
      });
      const progressList = await res.json();

      const allTimestamps = [];
      progressList.forEach((doc) => {
        Object.entries(doc.progress || {}).forEach(([moduleIdx, done]) => {
          if (done && doc.updatedAt) {
            allTimestamps.push(new Date(doc.updatedAt));
          }
        });
      });

      if (allTimestamps.length === 0) {
        setLabels(["Week 1"]);
        setCounts([0]);
        return;
      }
      allTimestamps.sort((a, b) => a - b);
      const start = allTimestamps[0];
      const weekBuckets = {};

      allTimestamps.forEach((ts) => {
        const weekNum =
          Math.floor((ts - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
        weekBuckets[weekNum] = (weekBuckets[weekNum] || 0) + 1;
      });

      const lbls = Object.keys(weekBuckets)
        .sort((a, b) => a - b)
        .map((w) => `Week ${w}`);
      const data = lbls.map((w) => weekBuckets[parseInt(w.split(" ")[1], 10)]);

      setLabels(lbls);
      setCounts(data);
    }

    fetchCompletionTimestamps();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Modules Completed",
        data: counts,
        fill: true,
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
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Modules Completed" },
      },
      x: {
        title: { display: true, text: "Time (weeks)" },
      },
    },
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div
        style={{
          height: 350,
          background: "#fff5f2",
          borderRadius: 16,
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
          fontWeight: 500,
          fontSize: "1.05rem",
          color: "#000",
          fontFamily: "Kite One",
        }}
      >
        Modules Completed Over Time
      </p>
    </div>
  );
}
