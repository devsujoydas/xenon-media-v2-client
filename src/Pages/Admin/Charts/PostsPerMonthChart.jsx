// Charts/PostsPerMonthChart.jsx
import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { FileText } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MONTHS_TO_SHOW = 6;

const PostsPerMonthChart = ({ posts = [] }) => {
  const { labels, values } = useMemo(() => {
    const now = new Date();
    const monthSlots = [];
    for (let i = MONTHS_TO_SHOW - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthSlots.push({ key, label, count: 0 });
    }

    const slotMap = Object.fromEntries(monthSlots.map((s) => [s.key, s]));

    posts.forEach((post) => {
      if (!post.createdAt) return;
      const date = new Date(post.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (slotMap[key]) slotMap[key].count += 1;
    });

    return {
      labels: monthSlots.map((s) => s.label),
      values: monthSlots.map((s) => s.count),
    };
  }, [posts]);

  const hasData = values.some((v) => v > 0);

  const data = {
    labels,
    datasets: [
      {
        label: "Posts",
        data: values,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return "#3b82f6";
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#34d399");
          gradient.addColorStop(1, "#059669");
          return gradient;
        },
        borderRadius: 8,
        maxBarThickness: 42,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        padding: 10,
        cornerRadius: 8,
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: "#9ca3af", precision: 0 },
        grid: { color: "#f3f4f6" },
      },
      x: {
        ticks: { color: "#9ca3af" },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          Posts Per Month
        </h2>
        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
          <FileText className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      <div className="h-56 md:h-64">
        <Bar data={data} options={options} />
      </div>

      {!hasData && (
        <p className="text-center text-xs text-gray-400 mt-3">
          No posts in the last {MONTHS_TO_SHOW} months
        </p>
      )}
    </div>
  );
};

export default PostsPerMonthChart;