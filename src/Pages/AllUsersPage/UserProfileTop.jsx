import React, { useState } from "react";
import { MdEdit, MdVerified, MdLocationOn, MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { getCurrentUserId } from "../../hooks/userHooks/Currentuser";
import FollowButton from "./FollowButton";
import UpdateProfileModal from "../../Components/Modals/UpdateProfileModal";
import UpdateUsernameModal from "../../Components/Modals/UpdateUsernameModal";
import UploadProfilePicture from "../../Components/Modals/UploadProfilePicture";
import { BsFillCameraFill } from "react-icons/bs";

const StatItem = ({ count, label }) => (
  <div className="flex gap-1 items-center px-4 sm:px-5">
    <strong className="text-sm text-[#14231F]">{count}</strong>
    <span className="text-sm text-[#5B6B65]">{label}</span>
  </div>
);

const UserProfileTop = ({ user, posts }) => {
  const currentUserId = getCurrentUserId();
  const isOwnProfile = String(currentUserId) === String(user._id);

  const [followersCount, setfollowersCount] = useState(
    user?.followers?.length || 0,
  );

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);

  // one modal, two targets — "profile" or "cover"
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoType, setPhotoType] = useState("profile");

  const openPhotoModal = (type) => {
    setPhotoType(type);
    setPhotoModalOpen(true);
  };

  return (
    <div>
      <UpdateProfileModal
        showUpdateInfoModal={showUpdateInfoModal}
        setShowUpdateInfoModal={setShowUpdateInfoModal}
      />
      <UpdateUsernameModal
        showUsernameModal={showUsernameModal}
        setShowUsernameModal={setShowUsernameModal}
      />
      <UploadProfilePicture
        isOpen={photoModalOpen}
        setIsOpen={setPhotoModalOpen}
        type={photoType}
      />
      <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border border-zinc-200">
        {/* Cover */}
        <div
          style={{ backgroundImage: `url(${user?.coverImage?.url})` }}
          className="h-44 sm:h-64 w-full bg-center bg-cover bg-zinc-200 relative"
        />
        {isOwnProfile && (
          <div
            onClick={() => openPhotoModal("cover")}
            className="absolute md:top-50 top-32 right-3 p-2 md:p-3 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
          >
            <BsFillCameraFill className="text-xl text-zinc-700" />
          </div>
        )}
        {/* Profile Info */}
        <div className="px-5 sm:px-8 pb-6">
          <div className="flex flex-row items-end justify-between -mt-14 sm:-mt-16">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full  border-4 border-white shadow-lg shrink-0 bg-zinc-100 relative">
              <img
                className="w-full h-full object-cover rounded-full"
                src={user?.profileImage?.url}
                alt={user?.name}
              />
              {isOwnProfile && (
                <div
                  onClick={() => openPhotoModal("profile")}
                  className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
                >
                  <BsFillCameraFill className="text-lg text-zinc-700" />
                </div>
              )}
            </div>

            {/* Action button */}
            <div className="mt-3 sm:mt-0 sm:mb-2">
              {isOwnProfile ? (
                <button
                  onClick={() => {
                    setShowUpdateInfoModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 text-xs md:text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors cursor-pointer bg-white"
                >
                  <MdEdit className="text-base" />
                  Edit profile
                </button>
              ) : (
                <div className="">
                  <FollowButton
                    followersCount={followersCount}
                    setfollowersCount={setfollowersCount}
                    anotherUser={user}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="mt-3 flex items-center gap-2">
            <h1 className="font-bold text-xl sm:text-3xl text-zinc-900 flex  items-center gap-2">
              {user?.name}
              {isOwnProfile ? (
                <div className="bg-green-400 h-4 w-4 rounded-full  border border-white "></div>
              ) : (
                <span>
                  {user.activeStatus.online ? (
                    <p className="bg-green-400 h-3.5 w-3.5 rounded-full  border border-white"></p>
                  ) : (
                    <p className="bg-gray-400 h-3.5 w-3.5 rounded-full  border border-white"></p>
                  )}
                </span>
              )}
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
            <div className="flex items-center gap-1">
              <p className="text-sm text-zinc-500 mt-0.5">@{user.username}</p>
              {isOwnProfile && (
                <MdEdit
                  onClick={() => setShowUsernameModal(true)}
                  className="p-1 text-xl rounded-full hover:bg-zinc-200 cursor-pointer transition"
                />
              )}
            </div>
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
    </div>
  );
};

export default UserProfileTop;
