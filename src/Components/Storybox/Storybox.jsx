import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useUsers } from "../../hooks/userHooks/useUsers";

const Storybox = () => {
  const { data } = useUsers();

  return (
    <div className="bg-white md:p-5 p-2 rounded-xl shadow-xl">
      <div className="w-full  overflow-hidden ">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-2">
          {data?.users.map((user, idx) => (
            <div key={idx} className="shrink-0">
              <Link to={`/profile/${user?.username}`} className="relative">
                <img
                  className={`md:w-20 w-16 md:h-20 h-16 object-cover border-3  ${user?.activeStatus.online ? "hover:border-emerald-500 border-emerald-500" : "hover:border-red-500 border-gray-300"} active:scale-95 transition-all duration-500 cursor-pointer rounded-full`}
                  src={user?.profileImage.url}
                  alt=""
                />
                {user?.activeStatus.online && (
                  <div className="bg-green-400 h-3.5 w-3.5 rounded-full  border border-white absolute bottom-1 right-2"></div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Storybox;
