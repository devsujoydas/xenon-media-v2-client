import React from "react";
import { MdEdit, MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
 

const UserProfileTop = ({ user, posts }) => {
  return (
    <div className="flex flex-col bg-white/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-zinc-200">
      {/* Cover */}
      <div
        style={{ backgroundImage: `url(${user?.coverImage?.url})` }}
        className="h-56 sm:h-72 w-full bg-center bg-cover bg-zinc-200"
      />

      {/* Profile Info */}
      <div className="flex flex-col px-6 pb-6">
        {/* Avatar + Name */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-zinc-100">
            <img
              className="w-full h-full object-cover"
              src={user?.profileImage?.url}
              alt={user?.name || "Profile"}
            />
          </div>

          <div className="pb-2">
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-2xl text-zinc-900">
                {user?.name}
              </h1>
              {user?.isVerified && (
                <MdVerified className="text-blue-500 text-xl" title="Verified" />
              )}
            </div>

            <div className="flex items-center gap-2 text-zinc-500">
              <span>@{user?.username}</span>
              <button
                type="button"
                aria-label="Edit profile"
                className="p-1 text-lg rounded-full hover:bg-zinc-200 cursor-pointer transition"
              >
                <MdEdit />
              </button>
            </div>

            <p className="text-sm text-zinc-400 mt-1">
              {user?.location?.livesIn || "Address not added"}
            </p>
          </div>
        </div>

        {/* Bio */}
        {user?.bio && (
          <p className="text-zinc-600 mt-4 whitespace-pre-line">{user.bio}</p>
        )}

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-6 py-4 border-y border-zinc-100">
          <div className="text-center">
            <h1 className="text-lg font-semibold">{posts?.length || 0}</h1>
            <p className="text-sm text-zinc-500">Posts</p>
          </div>
          <Link to="/friends" className="text-center border-x px-6 border-zinc-200">
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
        
      </div>
    </div>
  );
};

export default UserProfileTop;