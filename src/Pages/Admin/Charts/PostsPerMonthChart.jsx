import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const PostsPerMonthChart = ({ posts }) => {
  const postsByMonth = posts.reduce((acc, post) => {
    const date = new Date(post.createdAt);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(postsByMonth);
  const values = Object.values(postsByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "Posts",
        data: values,
        backgroundColor: "rgba(59, 130, 246, 0.7)", // 🔵 blue color
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">
        Posts Per Month
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PostsPerMonthChart;
