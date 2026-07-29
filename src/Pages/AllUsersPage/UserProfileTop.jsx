import React, { useState } from "react";
import { MdEdit, MdVerified, MdLocationOn, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { getCurrentUserId } from "../../hooks/userHooks/Currentuser";
import FollowButton from "./FollowButton";

const StatItem = ({ count, label }) => (

  <div className="flex flex-col items-center px-4 sm:px-5">
    <strong className="text-lg text-[#14231F]">{count}</strong>
    <span className="text-sm text-[#5B6B65]">{label}</span>
  </div>
);

const UserProfileTop = ({ user, posts }) => {
  const currentUserId = getCurrentUserId();
  const isOwnProfile = String(currentUserId) === String(user._id);

  const [followersCount, setfollowersCount] = useState(
    user?.followers?.length || 0,
  );
  const [followingCount, setfollowingCount] = useState(
    user?.following?.length || 0,
  );

  return (
    <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-zinc-200">
      {/* Cover */}
      <div
        style={{ backgroundImage: `url(${user?.coverImage?.url})` }}
        className="h-44 sm:h-64 w-full bg-center bg-cover bg-zinc-200"
      />

      {/* Profile Info */}
      <div className="px-5 sm:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-14 sm:-mt-16">
          {/* Avatar overlapping cover */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 bg-zinc-100">
            <img
              className="w-full h-full object-cover"
              src={user?.profileImage?.url}
              alt={user?.name || "Profile"}
            />
          </div>

          {/* Action button */}
          <div className="mt-3 sm:mt-0 sm:mb-2">
            {isOwnProfile ? (
              <Link
                to="/profile"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                <MdEdit className="text-base" />
                Edit profile
              </Link>
            ) : (
             <FollowButton followersCount={followersCount} setfollowersCount={setfollowersCount} user={user} />
            )}
          </div>
        </div>

        {/* Name */}
        <div className="mt-3 flex items-center gap-2">
          <h1 className="font-bold text-2xl sm:text-3xl text-zinc-900">
            {user?.name}
          </h1>
          {user?.isVerified && (
            <MdVerified
              className="text-blue-500 text-xl shrink-0"
              title="Verified"
            />
          )}
        </div>

        {/* Username */}
        {user?.username && (
          <p className="text-sm text-zinc-500 mt-0.5">@{user.username}</p>
        )}

        {/* Bio */}
        {user?.bio && (
          <p className="text-zinc-600 mt-3 whitespace-pre-line">{user.bio}</p>
        )}

        {/* Location */}
        {(user?.location?.livesIn || user?.location?.from) && (
          <div className="flex flex-col sm:flex-row sm:gap-4 mt-2 text-sm text-zinc-500">
            {user.location?.livesIn && (
              <span className="flex items-center gap-1">
                <MdLocationOn className="text-base" />
                Lives in {user.location.livesIn}
              </span>
            )}
            {user.location?.from && (
              <span className="flex items-center gap-1">
                <MdHome className="text-base" />
                From {user.location.from}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex mt-5 divide-x divide-zinc-200 border-t border-zinc-100 pt-4">
          <StatItem count={followersCount || 0} label="Followers" />
          <StatItem count={user?.following?.length || 0} label="Following" />
          <StatItem count={posts?.length || 0} label="Posts" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileTop;
