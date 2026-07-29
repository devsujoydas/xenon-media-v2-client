// AdminDashboard.jsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, FileText, Heart, Clock } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

import NewUsersPerMonthChart from "./Charts/NewUsersPerMonthChart";
import PostsPerMonthChart from "./Charts/PostsPerMonthChart";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import { useUsers } from "../../hooks/userHooks/useUsers";
import { usePosts } from "../../hooks/postHooks/usePosts";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { data, isLoading: usersLoading } = useUsers();
  const { data: posts, isLoading: postsLoading } = usePosts();

  const users = data?.users || [];
  const postList = posts || [];

  if (!user || usersLoading || postsLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalUsers = users.length;
  const totalPosts = postList.length;
  const totalReacts = postList.reduce(
    (sum, p) => sum + (p.reacts?.length || 0),
    0
  );
  const pendingPosts = postList.filter((p) => p.status === "pending").length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Total Posts",
      value: totalPosts,
      icon: FileText,
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Total Reactions",
      value: totalReacts,
      icon: Heart,
      color: "from-violet-500 to-violet-600",
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      title: "Pending Posts",
      value: pendingPosts,
      icon: Clock,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of your platform's activity
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <img
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-100"
            src={user?.profileImage?.url}
            alt="Admin"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 leading-tight">
              {user?.name || "Admin"}
            </p>
            <span className="text-[10px] uppercase tracking-wide text-blue-500 font-medium">
              Administrator
            </span>
          </div>
        </div>
      </header>

      {/* Stat cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-10">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="relative bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={`absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div
                className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}
              >
                <Icon className={`w-5 h-5 ${card.text}`} strokeWidth={2.2} />
              </div>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                {card.title}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {card.value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <NewUsersPerMonthChart users={users} />
        <PostsPerMonthChart posts={postList} />
      </section>
    </div>
  );
};

export default AdminDashboard;