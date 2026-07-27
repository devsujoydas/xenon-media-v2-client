import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import ContactInfo from "../Profile/ContactInfo";

const UserProfileTop = ({ user, posts }) => {
  return (
    <div className="flex flex-col bg-white/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-zinc-200">
      {/* Cover */}
      <div
        style={{
          backgroundImage: `url(${user?.coverImage?.url})`,
        }}
        className="relative h-90 w-full bg-center bg-cover"
      ></div>

      {/* Profile Info */}
      <div className="flex flex-col  -mt-20 px-6 pb-6 ">
        {/* Profile Pic */}
        <div className="relative border flex items-center">
          <img
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
            src={user?.profileImage?.url}
            alt="Profile"
          />
          <div className="mt-4 text-center ">
            <h1 className="font-semibold text-xl">
              {user?.name || "Your Name"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <span>@{user?.username || "username"}</span>
              <MdEdit className="p-1 text-xl rounded-full hover:bg-zinc-200 cursor-pointer transition" />
            </div>
            <p className="text-sm text-zinc-400">
              {user?.location?.livesIn || "Address not added"}
            </p>
          </div>
        </div>

        {/* Name & Username */}

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <h1 className="text-lg font-semibold">{posts?.length || 0}</h1>
            <p className="text-sm text-zinc-500">Posts</p>
          </div>
          <Link to={"/friends"} className="text-center border-x px-6">
            <h1 className="text-lg font-semibold">
              {user?.followers?.length || 0}
            </h1>
            <p className="text-sm text-zinc-500">Friends</p>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-semibold">
              {user?.following?.length || 0}
            </h1>
            <p className="text-sm text-zinc-500">Following</p>
          </div>
        </div>

        {/* About */}
        <div className="w-full mt-8 space-y-4">
          <ContactInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfileTop;
