import { NavLink } from "react-router-dom";

import { FaUserFriends } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { MdWebStories } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import { usePosts } from "../../hooks/postHooks/usePosts";
import { useMyPosts } from "../../hooks/postHooks/useMyPosts";
import { useUsers } from "../../hooks/userHooks/useUsers";

const Nav = () => {
  const { user } = useAuth();
  const { data: posts } = usePosts();
  const { data: users } = useUsers();

  const { data: myPosts } = useMyPosts();

  return (
    <div className="md:space-y-7 space-y-4 md:px-5 px-3">
      <NavLink
        to={"/"}
        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 "
      >
        <div className="flex items-center gap-2 md:text-xl ">
          <IoHome className="text-zinc-500 text-2xl" />
          <span className="font-semibold ">Home </span>
        </div>
        <div>
          <p className="px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full">
            {posts?.length}
          </p>
        </div>
      </NavLink>

      <NavLink
        to={`/profile`}
        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 "
      >
        <div className="flex items-center gap-2 md:text-xl ">
          <img
            className="w-7 h-7 object-cover rounded-full"
            src={user?.profileImage?.url}
            alt=""
          />
          <span className="font-semibold ">Profile</span>
        </div>
        <div>
          <p className="px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full">
            {myPosts?.length}
          </p>
        </div>
      </NavLink>

      <NavLink
        to={"/users"}
        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 "
      >
        <div className="flex items-center gap-2 md:text-xl ">
          <FaUserFriends className="text-zinc-500 text-2xl" />
          <span className="font-semibold ">All Users</span>
        </div>
        <div>
          <p className="px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full">
            {users?.userCounts}
          </p>
        </div>
      </NavLink>

      <NavLink
        to={"/savedposts"}
        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 "
      >
        <div className="flex items-center gap-2 md:text-xl ">
          <MdWebStories className="text-zinc-500 text-2xl" />
          <span className="font-semibold ">Saved Posts</span>
        </div>
      </NavLink>

      <div className="bg-zinc-200 h-1.5"></div>

      {user?.role == "admin" && (
        <>
          <NavLink
            to={"/admin/dashboard"}
            className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 "
          >
            <div className="flex items-center gap-2 md:text-xl ">
              <MdDashboard className="text-zinc-500 text-2xl" />
              <span className="font-semibold ">Admin Panel</span>
            </div>
          </NavLink>
          <div className="bg-zinc-200 h-1.5"></div>
        </>
      )}
    </div>
  );
};

export default Nav;
