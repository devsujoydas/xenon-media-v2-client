import Swal from "sweetalert2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6"; 

const UserTableCard = ({ friend, makeAdmin, removeAdmin, refetch }) => {
    const [isAdmin, setIsAdmin] = useState(friend.role === "admin");

    const handleMakeAdmin = () => {
        Swal.fire({
            title: `Make ${friend.name} an Admin?`,
            text: "They will have full access to admin privileges.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00A63E",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                makeAdmin(friend.email);
                setIsAdmin(true);
                Swal.fire("Success!", `${friend.name} is now an admin.`, "success");
            }
        });
    };

    const handleRemoveAdmin = () => {
        Swal.fire({
            title: `Remove Admin Access from ${friend.name}?`,
            text: "They will no longer have admin privileges.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a60000",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Remove Admin!",
        }).then((result) => {
            if (result.isConfirmed) {
                removeAdmin(friend.email);
                setIsAdmin(false);
                Swal.fire("Removed!", `${friend.name} is no longer an admin.`, "success");
            }
        });
    };

    const handleDeleteUser = async () => {
        Swal.fire({
            title: `Delete ${friend.name}'s account?`,
            text: "All posts, comments, likes and data will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#a60000",
            cancelButtonColor: "#3085d6",   
            confirmButtonText: "Yes, Delete!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await api.delete(
                        `/profile/delete/${friend._id}`
                    );
                    Swal.fire("Deleted!", res.data.message || "User account deleted.", "success");
                    refetch?.();
                } catch (error) {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error", "Something went wrong while deleting the user.", "error");
                }
            }
        });
    };
  
    return (
        <tr className="bg-white border-b border-gray-200">
            <th scope="row" className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/profile/${friend.username}`}>
                    <div className="flex items-center gap-3">
                        <img
                            className="w-14 h-14 rounded-full border-3 border-zinc-300 object-cover"
                            src={friend?.profile?.profilePhotoUrl || "/default.jpg"}
                            alt="Admin Profile"
                        />
                        <div className="space-y-1">
                            <h1 className="font-semibold text-black">{friend?.name}</h1>
                            <p className="text-zinc-500 text-xs">
                                Joined on{" "}
                                {new Date(friend.createdDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </Link>
            </th>
            <td className="px-6 py-3">{friend.email}</td>
            <td className="px-6 py-3">
                {friend.onlineStatus ? (
                    <p className="text-emerald-700 font-semibold">Online</p>
                ) : (
                    <p className="text-zinc-400">Offline</p>
                )}
            </td>
            <td className="px-6 py-3">{isAdmin ? "admin" : "user"}</td>
            <td className="px-6 py-3 text-sm">
                {isAdmin ? (
                    <button
                        onClick={handleRemoveAdmin}
                        className="flex items-center gap-1 border border-zinc-300 rounded-md py-1.5 px-2 bg-[#a60000] text-white hover:bg-zinc-200 hover:text-black cursor-pointer active:scale-95 duration-300 transition-all"
                    >
                        <MdOutlineAdminPanelSettings className="text-lg" />
                        <p className="text-xs">Remove Admin</p>
                    </button>
                ) : (
                    <button
                        onClick={handleMakeAdmin}
                        className="flex items-center gap-1 border border-zinc-300 rounded-md py-1.5 px-2 bg-[#00A63E] text-white hover:bg-zinc-200 hover:text-black cursor-pointer active:scale-95 duration-300 transition-all"
                    >
                        <MdOutlineAdminPanelSettings className="text-lg" />
                        <p className="text-xs">Make Admin</p>
                    </button>
                )}
            </td>
            <td className="px-6 py-3 text-sm">
                <button
                    onClick={handleDeleteUser}
                    className="flex items-center gap-1 border border-zinc-300 rounded-md py-2 px-2 bg-[#a60000] text-white hover:bg-[#ff6565] cursor-pointer active:scale-95 duration-300 transition-all"
                >
                    <FaRegTrashCan />
                    <p className="text-xs">Delete</p>
                </button>
            </td>
        </tr>
    );
};

export default UserTableCard;
