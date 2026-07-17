import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement);
// import { useAuth } from "../../hooks/useAuth";
import NewUsersPerMonthChart from "./Charts/NewUsersPerMonthChart";
import PostsPerMonthChart from "./Charts/PostsPerMonthChart";


const AdminDashboard = () => {
  const { userData, postsData,  friendsData } = useAuth()
  console.log(friendsData,)

  if (!userData) return <p>Loading admin info...</p>;

  const totalUsers = friendsData?.length || 0;
  const totalPosts = postsData?.length || 0;
  const totalLikes = postsData.reduce((sum, p) => sum + p.likes.length, 0);
  return (
    <div>
      <header className="mb-3 md:mb-8 flex justify-between items-center">
        <h1 className="md:text-3xl text-xl font-bold">Dashboard</h1>
        <p className="text-gray-600 md:text-[16px] text-xs">Welcome, {userData?.name || "Admin"}</p>
      </header>

      <div className="bg-white p-3 md:p-6 rounded-lg shadow mb-3 md:mb-8">
        <h1 className="font-semibold text-zinc-500 mb-3 md:text-[16px] text-sm">Administrator Information</h1>
        <div className="flex items-start gap-3">
          <div>
            <img
              className="md:w-20 w-14 md:h-20 h-14 rounded-full border-3 border-zinc-300"
              src={userData?.profileImage.url}
              alt="Admin Profile"
            />
          </div>
          <div className="space-y-1">
            <h1 className="font-bold flex items-center gap-1 md:text-xl">
              {userData.name}
              <span className="md:text-xs text-[10px] border border-zinc-300 rounded-md px-1 md:py-0.5 bg-zinc-300 font-medium text-blue-500">
                admin
              </span>
            </h1>
            <p className="text-zinc-500 md:text-xs text-[10px]">{userData.email}</p>
            <p className="text-zinc-500 md:text-xs text-[10px]">
              Joined on{" "}
              {new Date(userData.createdDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      <section className="grid  grid-cols-3 gap-3 md:gap-6 mb-3 md:mb-10">
        {[
          { title: "Total Users", value: totalUsers, bgColor: "#1F6EFF" },
          { title: "Total Posts", value: totalPosts, bgColor: "#00AB72" },
          { title: "Total Likes", value: totalLikes, bgColor: "#8740FF" },
        ].map((card) => (
          <div key={card.title} className={`bg-white p-3 md:p-6 rounded-lg shadow`}>
            <p className="md:text-sm text-xs  text-gray-500">{card.title}</p>
            <p className="md:text-3xl text-2xl font-bold text-blue-600">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <NewUsersPerMonthChart users={friendsData} />
        <PostsPerMonthChart posts={postsData} />
      </section>
    </div>
  );
};

export default AdminDashboard;
