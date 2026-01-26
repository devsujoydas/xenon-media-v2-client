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

const NewUsersPerMonthChart = ({ users }) => { 
  const usersByMonth = users.reduce((acc, user) => {
    const date = new Date(user.createdDate);
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(usersByMonth);
  const values = Object.values(usersByMonth);

  const data = {
    labels,
    datasets: [
      {
        label: "New Users",
        data: values,
        backgroundColor: "rgba(239, 68, 68, 0.7)", // 🔴 same style
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
        New Users Per Month
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NewUsersPerMonthChart;
