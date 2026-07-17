
import { NavLink } from "react-router-dom";

import { FaUserFriends } from 'react-icons/fa';
import { FaLightbulb } from "react-icons/fa";
import { MdWebStories } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaTicketAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md"; 
import { useAuth } from "../../AuthProvider/AuthProviderNew";

const Nav = () => {
    const { user, myFriends } = useAuth()

    return (
        <div className="md:space-y-7 space-y-4 md:px-5 px-3">

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <IoHome className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Home </span>
                </div>
                <div>
                    <p className='px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full'>{}</p>
                </div>
            </NavLink>

            <NavLink to={`/profile`}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <img className="w-7 h-7 object-cover rounded-full" src={!user?.profileImage?.url ? `/default.jpg` : `${user?.profileImage?.url}`} alt="" />
                    <span className="font-semibold ">Profile</span>
                </div>
                <div>
                    <p className='px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full'>{}</p>
                </div>
            </NavLink>

            {/* <NavLink to={"/message"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <AiFillMessage className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Message</span>
                </div>
            </NavLink> */}

            {
                user?.role == "admin" &&
                <>
                    {/* <NavLink to={"/profile-page"}
                        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                        <div className="flex items-center gap-2 md:text-xl ">
                            <MdDashboard className="text-zinc-500 text-2xl" />
                            <span className="font-semibold ">Profile Page</span>
                        </div>
                    </NavLink> */}

                    <NavLink to={"/admin/dashboard"}
                        className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                        <div className="flex items-center gap-2 md:text-xl ">
                            <MdDashboard className="text-zinc-500 text-2xl" />
                            <span className="font-semibold ">Admin Panel</span>
                        </div>
                    </NavLink>
                </>
            }

            {/* <NavLink to={"/friends"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaUserFriends className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Friends</span>
                </div>
                <div>
                    <p className='px-2 py-1 md:text-[16px] text-xs bg-zinc-300 rounded-full'>{myFriends?.length}</p>
                </div>
            </NavLink> */}


            {/* <NavLink to={"/savedposts"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <MdWebStories className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Saved Posts</span>
                </div>
            </NavLink>
             */}
            <div className='bg-zinc-200 h-1.5'></div>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaTicketAlt className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Events</span>
                </div>
            </NavLink>

            <NavLink to={"/"}
                className="flex justify-between w-full cursor-pointer   transition-all hover:text-blue-500 ">
                <div className="flex items-center gap-2 md:text-xl ">
                    <FaLightbulb className="text-zinc-500 text-2xl" />
                    <span className="font-semibold ">Memories</span>
                </div>
            </NavLink>
        </div>
    )
}

export default Nav