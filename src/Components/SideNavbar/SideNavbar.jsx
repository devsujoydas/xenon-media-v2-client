import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import { useState } from "react";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { useLogOut } from "../../hooks/useLogOut";
import { FiLogOut } from "react-icons/fi";
import { FaUserSlash } from "react-icons/fa";

const SideNavbar = () => {
  const { user } = useAuth();
  const logOut = useLogOut();
  const deleteAccount = useDeleteAccount();
  console.log(user);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="md:sticky top-0 bg-white flex items-center justify-between px-5 py-[17px]  border-b border-zinc-400">
      <div className=" cursor-pointer active:scale-95 transition-all">
        <Link to={`/profile`} className="relative">
          <img
            className="md:w-15.5 w-12 md:h-15.5 h-12 object-cover border border-zinc-200 rounded-full"
            src={
              !user?.profileImage?.url
                ? `/default.jpg`
                : `${user?.profileImage?.url}`
            }
            alt=""
          />
          {user.activeStatus.online && (
            <h1 className="absolute bottom-0 right-1 md:w-4 w-3 md:h-4 h-3 bg-green-400 border-2 border-white rounded-full"></h1>
          )}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* <div className="border border-zinc-400 md:text-2xl p-2 md:p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuMessageCircleMore className="" />
        </div>
        <div className="border border-zinc-400 md:text-2xl p-2 md:p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuBell className="" />
        </div> */}

        <div className="relative">
          <div
            onClick={() => setShowEdit(!showEdit)}
            className="p-3 rounded-full bg-white/80 shadow-md cursor-pointer hover:bg-white transition"
          >
            <IoSettingsOutline className="text-2xl text-zinc-700" />
          </div>

          {/* Dropdown */}
          <div
            onMouseLeave={() => setShowEdit(!showEdit)}
            className={`absolute right-0 z-50 mt-3 w-52 bg-white rounded-xl shadow-lg border border-zinc-200 transition-all duration-300 overflow-hidden ${
              showEdit
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
            }`}
          >
            <div className="p-2">
              <button
                onClick={logOut}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition hover:bg-zinc-100 cursor-pointer"
              >
                <FiLogOut className="text-zinc-500" />
                Log Out
              </button>

              <button
                onClick={deleteAccount}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 transition hover:bg-red-50 cursor-pointer"
              >
                <FaUserSlash />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
