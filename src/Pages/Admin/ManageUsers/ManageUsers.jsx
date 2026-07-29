// pages/ManageUsers.jsx
import React, { useState, useMemo } from "react";
import { Search, Trash2, ShieldCheck, ShieldOff, X, AlertTriangle } from "lucide-react";
import { useUsers } from "../../../hooks/userHooks/useUsers";
import { useDeleteUser } from "../../../hooks/userHooks/useDeleteUser";
 
const ManageUsers = () => {
  const { data, isLoading } = useUsers();
  const users = data?.users || [];

  const { mutate: deleteUser, isPending: deleting } = useDeleteUser();

  const [search, setSearch] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleDeleteConfirm = () => {
    if (!userToDelete) return;
    setErrorMsg("");
    deleteUser(userToDelete._id, {
      onSuccess: () => {
        setUserToDelete(null);
      },
      onError: (err) => {
        const msg =
          err?.response?.data?.message || "Failed to delete user. Try again.";
        setErrorMsg(msg);
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Manage Users
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View, verify, and manage all registered users
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, username, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
          />
        </div>
      </header>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-3.5 font-semibold">User</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Role</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Followers</th>
                <th className="px-5 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200" />
                        <div className="space-y-1.5">
                          <div className="h-3 w-28 bg-gray-200 rounded" />
                          <div className="h-2.5 w-16 bg-gray-100 rounded" />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><div className="h-3 w-32 bg-gray-200 rounded" /></td>
                    <td className="px-5 py-4"><div className="h-3 w-14 bg-gray-200 rounded" /></td>
                    <td className="px-5 py-4"><div className="h-3 w-16 bg-gray-200 rounded" /></td>
                    <td className="px-5 py-4"><div className="h-3 w-10 bg-gray-200 rounded" /></td>
                    <td className="px-5 py-4 text-right"><div className="h-3 w-8 bg-gray-200 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center text-gray-400 text-sm">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={user.profileImage?.url || "/default_profile.webp"}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-gray-100"
                          />
                          <span
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                              user.activeStatus?.online ? "bg-emerald-500" : "bg-gray-300"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 leading-tight">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">{user.email}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                          user.role === "admin"
                            ? "bg-blue-50 text-blue-600"
                            : user.role === "ceo"
                            ? "bg-violet-50 text-violet-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {user.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400 text-xs font-medium">
                          <ShieldOff className="w-3.5 h-3.5" /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600">
                      {user.followers?.length || 0}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => {
                          setErrorMsg("");
                          setUserToDelete(user);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setUserToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Delete this user?
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              <span className="font-medium text-gray-700">{userToDelete.name}</span>{" "}
              (@{userToDelete.username}) will be permanently removed. This action cannot be undone.
            </p>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;