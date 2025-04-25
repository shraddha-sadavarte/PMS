import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { fetchDashboardMetrics } from "../api/dashboardApi.js";
import "../styles/dashboardChart.css";

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement, LineElement);

const DashboardCharts = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardMetrics();
        setChartData(data);
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    loadData();
  }, []);

  if (!chartData) return <p>Loading charts...</p>;

  const completionData = {
    labels: chartData.completionStats.map((item) => item.user),
    datasets: [
      {
        label: "Completion %",
        data: chartData.completionStats.map((item) => item.percent),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const assignmentData = {
    labels: chartData.assignmentStats.map((item) => item.month || "Unknown"),
    datasets: [
      {
        label: "Tasks Assigned",
        data: chartData.assignmentStats.map((item) => item.count),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="dashboard-container">
      <h3>Completion Stats</h3>
      <Bar data={completionData} options={barOptions} />

      {/* <h3>Assignment Stats</h3>
      <Line data={assignmentData} options={lineOptions} /> */}
    </div>
  );
};

export default DashboardCharts;
