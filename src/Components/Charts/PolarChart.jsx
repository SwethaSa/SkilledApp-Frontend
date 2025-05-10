import React, { useState, useEffect } from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const API = import.meta.env.VITE_API;

function PolarChart() {
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    async function fetchTopicProgress() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${API}/progress/user/${localStorage.getItem("userId")}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch progress");
        const progressList = await res.json();
        // progressList: [{ userId, courseId, progress: { '0': true, '1': false, ... } }, ...]

        // fetch each course to read its topic
        const byTopic = {};
        await Promise.all(
          progressList.map(async (doc) => {
            const courseRes = await fetch(`${API}/course/${doc.courseId}`, {
              headers: { "x-auth-token": token },
            });
            const course = await courseRes.json();
            const topic = course.topic || "Other";
            const done = Object.values(doc.progress || {}).filter(
              (v) => v
            ).length;
            const total = course.modules.length;
            const pct = Math.floor((done / total) * 100);
            // accumulate average per topic
            if (!byTopic[topic]) byTopic[topic] = [];
            byTopic[topic].push(pct);
          })
        );

        // prepare labels and averages
        const lbls = [];
        const data = [];
        Object.entries(byTopic).forEach(([topic, arr]) => {
          lbls.push(topic);
          const avg = Math.floor(arr.reduce((a, b) => a + b, 0) / arr.length);
          data.push(avg);
        });

        setLabels(lbls);
        setDataPoints(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTopicProgress();
  }, []);

  // fallback if no data yet
  const chartLabels = labels.length
    ? labels
    : ["IT", "Personal Growth", "Finance", "Language", "Creative Skills"];
  const chartData = dataPoints.length ? dataPoints : [0, 0, 0, 0, 0];

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Skill Level",
        data: chartData,
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
    animation: { duration: 1500, easing: "easeInOutQuart" },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#333", font: { size: 14 } },
      },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 360, margin: "auto" }}>
      <div
        style={{
          height: 350,
          background: "#fff5f2",
          borderRadius: 16,
          padding: "1rem",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <PolarArea data={data} options={options} />
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: ".75rem",
          fontWeight: 500,
          fontSize: "1.05rem",
          color: "#333",
          fontFamily: "Kite One",
        }}
      >
        Skill Distribution
      </p>
    </div>
  );
}

export default PolarChart;
