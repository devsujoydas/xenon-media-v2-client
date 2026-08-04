import { Link } from "react-router-dom";
import { useState } from "react";
import Nav from "./Nav";
import Swal from "sweetalert2";

import { FiAlertTriangle, FiLogOut } from "react-icons/fi";
import { IoCloseSharp, IoSettingsOutline } from "react-icons/io5";
import { RxExit } from "react-icons/rx";
import { IoMenu } from "react-icons/io5";
import NavSearch from "./NavSearch.jsx";
import { useAuth } from "../../AuthProvider/AuthProviderNew.jsx";
import NavLogo from "./NavLogo.jsx";
import { useLogOut } from "../../hooks/useLogOut.js";
import { Lock, Settings } from "lucide-react";
import { useDeleteAccount } from "../../hooks/useDeleteAccount.js";
import { FaUserSlash } from "react-icons/fa";
import ChangePasswordModal from "../Modals/ChangePasswordModal.jsx";

const Navbar = ({ setShowChangePassModal }) => {
  const { user } = useAuth();
  const [humbarger, setHumbarger] = useState(1);

  const logOut = useLogOut();
  const deleteAccount = useDeleteAccount();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="lg:sticky left-0 top-0 ">
      <div className="fixed z-20 w-full bg-white left-0 top-0 border-b border-zinc-400 lg:hidden flex justify-between items-center px-5 py-3">
        <NavLogo />

        <div
          onClick={() => setHumbarger(!humbarger)}
          className="md:text-5xl text-4xl cursor-pointer active:scale-95 transition-all"
        >
          <IoMenu />
        </div>
      </div>

      {/* nav for lg device  */}
      <div className="">
        <div className=" px-5 py-5 hidden lg:flex flex-col justify-between h-[100dvh] border-r border-zinc-300">
          <div className=" space-y-6 ">
            {/* nav logo  */}
            <div className="">
              <NavLogo />
            </div>

            <NavSearch />
            <Nav />
          </div>

          <div className="space-y-5">
            <hr className="text-zinc-300" />

            <div className=" flex justify-between items-center cursor-pointer">
              <Link to={`/profile`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 overflow-hidden rounded-full">
                    <img
                      className=" h-full w-full object-cover rounded-full"
                      src={
                        !user?.profileImage?.url
                          ? `/default.jpg`
                          : `${user?.profileImage?.url}`
                      }
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h1 className="font-semibold text-xl">
                      {user?.name ? `${user?.name}` : "Your Name"}
                    </h1>
                    <p>{user?.role == "admin" ? "Admin" : "Basic member"}</p>
                  </div>
                </div>
              </Link>
              <div
                onClick={() => setShowEdit(!showEdit)}
                className="p-3 rounded-full bg-white/80 shadow-md cursor-pointer hover:bg-white transition relative"
              >
                <IoSettingsOutline className="text-2xl text-zinc-700" />

                <div
                  onMouseLeave={() => setShowEdit(!showEdit)}
                  className={`absolute bottom-12 right-5 z-40 mt-3 w-52 bg-white rounded-xl shadow-lg border border-zinc-200 transition-all duration-300 overflow-hidden ${
                    showEdit
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-2" onClick={() => setHumbarger(!humbarger)}>
                    <button
                      onClick={() => setShowChangePassModal(true)}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition hover:bg-zinc-100 cursor-pointer"
                    >
                      <Lock size={14} className="text-zinc-500" />
                      Change Password
                    </button>
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
        </div>
      </div>

      {/* nav for sm device  */}
      <div
        className={
          humbarger
            ? "bg-white lg:hidden fixed top-0 -left-121 w-full -z-50  opacity-0 duration-700 transition-all"
            : "lg:hidden opacity-100 fixed z-50 top-0 left-0 w-full   duration-700 transition-all"
        }
      >
        <div className="flex h-screen  w-full ">
          <div className="px-3 py-3 md:w-140 w-2/3 bg-white overflow-hidden flex flex-col justify-between">
            <div className="space-y-7 ">
              {/* nav logo  */}
              <div className=" flex justify-between px-2 items-center cursor-pointer">
                <NavLogo />
                <IoCloseSharp
                  onClick={() => setHumbarger(!humbarger)}
                  className="md:text-4xl text-3xl "
                />
              </div>
              <NavSearch />
              <div onClick={() => setHumbarger(!humbarger)}>
                <Nav />
              </div>
            </div>

            <div className=" ">
              <hr className="text-zinc-300 pb-3" />
              <div className=" flex justify-between items-center cursor-pointer">
                <Link to={`/profile`}>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img
                        className=" h-full w-full object-cover rounded-full"
                        src={
                          !user?.profileImage?.url
                            ? `/default.jpg`
                            : `${user?.profileImage?.url}`
                        }
                        alt=""
                      />
                    </div>
                    <div className="">
                      <h1 className="font-semibold">
                        {user?.name ? `${user?.name}` : "Your Name"}
                      </h1>
                      <p className=" text-sm">
                        @{user?.username ? `${user?.username}` : "username"}
                      </p>
                    </div>
                  </div>
                </Link>

                <div
                  onClick={() => setShowEdit(!showEdit)}
                  className="p-3 rounded-full bg-white/80 shadow-md cursor-pointer hover:bg-white transition relative"
                >
                  <IoSettingsOutline className="text-2xl text-zinc-700" />

                  <div
                    onMouseLeave={() => setShowEdit(!showEdit)}
                    className={`absolute bottom-12 right-5 z-40 mt-3 w-52 bg-white rounded-xl shadow-lg border border-zinc-200 transition-all duration-300 overflow-hidden ${
                      showEdit
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div
                      className="p-2"
                      onClick={() => setHumbarger(!humbarger)}
                    >
                      <button
                        onClick={() => setShowChangePassModal(true)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition hover:bg-zinc-100 cursor-pointer"
                      >
                        <Lock size={14} className="text-zinc-500" />
                        Change Password
                      </button>
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
          </div>

          <div
            onClick={() => setHumbarger(!humbarger)}
            className={`${humbarger ? "bg-[#00000000] opacity-0 transition-all duration-500" : "bg-[#000000a2] opacity-100 transition-all duration-500"} md:w-full w-1/3  cursor-cell`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
