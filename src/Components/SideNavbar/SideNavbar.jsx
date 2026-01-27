import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu"
import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProviderNew";

const SideNavbar = () => {
  const { user } = useAuth()

  return (
    <div className="md:sticky top-0 bg-white flex items-center justify-between px-5 py-[17px]  border-b border-zinc-400">
      <div className=" cursor-pointer active:scale-95 transition-all">
        <Link to={`/profile`} className="relative">
          <img className="md:w-15.5 w-12 md:h-15.5 h-12 object-cover rounded-full" src={!user?.profile?.profilePhoto ? `/default.jpg` : `${user.profile.profilePhoto}`} alt="" />
          <h1 className="absolute bottom-0 right-1 md:w-4 w-3 md:h-4 h-3 bg-green-400 border-2 border-white rounded-full"></h1>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="border border-zinc-400 md:text-2xl p-2 md:p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuMessageCircleMore className="" />
        </div>
        <div className="border border-zinc-400 md:text-2xl p-2 md:p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200">
          <LuBell className="" />
        </div>
        <Link to={`/profile`}>
          <div className="border  border-zinc-400 md:text-2xl p-2 md:p-3 rounded-full cursor-pointer  transition-all hover:bg-zinc-200 ">
            <IoSettingsOutline className="active:rotate-45 transition-all" />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideNavbar