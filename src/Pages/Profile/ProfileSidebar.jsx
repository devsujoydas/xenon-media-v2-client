import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FaUserEdit, FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import UpdateUsernameModal from "../../Components/Modals/UpdateUsernameModal.jsx";
import UpdateProfileModal from "../../Components/Modals/UpdateProfileModal.jsx";
import { BsFillCameraFill } from "react-icons/bs";
import UploadProfilePicture from "../../Components/Modals/UploadProfilePicture.jsx";
import ContactInfo from "./ContactInfo.jsx";
import { useAuth } from "../../AuthProvider/AuthProviderNew.jsx";
import { useLogOut } from "../../hooks/useLogOut.js";

const ProfileSidebar = ({ myPosts }) => {
  const { user, usersPostsData, deleteAccount } = useAuth()
  const logOut = useLogOut();

  const [showEdit, setShowEdit] = useState(false);

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  console.log(user)




  return (
    <div className="w-full">
      {/* Modals */}
      <UpdateProfileModal
        showUpdateInfoModal={showUpdateInfoModal}
        setShowUpdateInfoModal={setShowUpdateInfoModal}
      />
      <UpdateUsernameModal
        showUsernameModal={showUsernameModal}
        setShowUsernameModal={setShowUsernameModal}
      />
      <UploadProfilePicture isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Sidebar Card */}
      <div className="flex flex-col bg-white/70 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-zinc-200">
        {/* Cover */}
        <div
          style={{
            backgroundImage: `url(${user?.profile?.coverPhoto ||
              "/default-cover.jpg"
              })`,
          }}
          className="relative h-48 w-full bg-center bg-cover"
        >
          {/* Cover Camera */}
          <div
            onClick={() => setIsOpen(true)}
            className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
          >
            <BsFillCameraFill className="text-xl text-zinc-700" />
          </div>

          {/* Settings */}
          <div className="absolute top-4 right-4">
            <div
              onClick={() => setShowEdit(!showEdit)}
              className="p-3 rounded-full bg-white/80 shadow-md cursor-pointer hover:bg-white transition"
            >
              <IoSettingsOutline className="text-2xl text-zinc-700" />
            </div>

            {/* Dropdown */}
            <div onClick={() => setShowEdit(!showEdit)}
              className={`absolute right-0 z-50 mt-3 w-52 bg-white rounded-xl shadow-lg border border-zinc-200 transition-all duration-300 overflow-hidden ${showEdit
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2 pointer-events-none"
                }`}
            >
              <div className="p-2">
                <button
                  onClick={() => setShowUpdateInfoModal(true)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition hover:bg-zinc-100 cursor-pointer"
                >
                  <FaUserEdit className="text-emerald-600" /> Edit Profile
                </button>
                <button
                  onClick={logOut}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition hover:bg-zinc-100 cursor-pointer"
                >
                  <FiLogOut className="text-zinc-500" /> Log Out
                </button>
                <button
                  onClick={() => deleteAccount()}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition text-red-600 hover:bg-red-50 cursor-pointer"
                >
                  <FaUserSlash /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col items-center -mt-16 px-6 pb-6">
          {/* Profile Pic */}
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              src={user?.profile?.profilePhoto || "/default.jpg"}
              alt="Profile"
            />
            <div
              onClick={() => setIsOpen(true)}
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md cursor-pointer hover:bg-zinc-100 transition"
            >
              <BsFillCameraFill className="text-lg text-zinc-700" />
            </div>
          </div>

          {/* Name & Username */}
          <div className="mt-4 text-center">
            <h1 className="font-semibold text-xl">
              {user?.name || "Your Name"}
            </h1>
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <span>@{user?.username || "username"}</span>
              <MdEdit
                onClick={() => setShowUsernameModal(true)}
                className="p-1 text-xl rounded-full hover:bg-zinc-200 cursor-pointer transition"
              />
            </div>
            <p className="text-sm text-zinc-400">
              {user?.location?.livesIn || "Address not added"}
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <h1 className="text-lg font-semibold">
                {myPosts?.length}
              </h1>
              <p className="text-sm text-zinc-500">Posts</p>
            </div>
            <Link to={"/friends"} className="text-center border-x px-6">
              <h1 className="text-lg font-semibold">
                {user?.friendCount}
              </h1>
              <p className="text-sm text-zinc-500">Friends</p>
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-semibold">0</h1>
              <p className="text-sm text-zinc-500">Following</p>
            </div>
          </div>

          {/* About */}
          <div className="w-full mt-8 space-y-4">
            <div>
              <h1 className="font-semibold text-lg mb-1">About Me</h1>
              <p className="text-sm text-zinc-600">
                {user?.profile?.bio || "No bio added."}
              </p>
            </div>

            <ContactInfo user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
