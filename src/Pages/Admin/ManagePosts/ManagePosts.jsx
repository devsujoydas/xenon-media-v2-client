// pages/ManagePosts.jsx
import React, { useState, useMemo } from "react";
import {
  Search,
  Trash2,
  Heart,
  Share2,
  MessageCircle,
  X,
  AlertTriangle,
  Check,
  Ban,
} from "lucide-react";
import { usePosts } from "../../../hooks/postHooks/usePosts";
import { useDeletePost } from "../../../hooks/postHooks/useDeletePost";
import { useUpdatePostStatus } from "../../../hooks/postHooks/useUpdatePostStatus";
import PageHelmet from "../../../Components/PageHelmet/PageHelmet";

const statusStyles = {
  pending: "bg-amber-50 text-amber-600",
  approved: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

const ManagePosts = () => {
  const { data: posts, isLoading } = usePosts();
  const postList = posts || [];

  const { mutate: deletePost, isPending: deleting } = useDeletePost();
  const { mutate: updateStatus, isPending: updating } = useUpdatePostStatus();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [postToDelete, setPostToDelete] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const filteredPosts = useMemo(() => {
    let list = postList;
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.content?.toLowerCase().includes(q) ||
          p.author?.name?.toLowerCase().includes(q) ||
          p.author?.username?.toLowerCase().includes(q),
      );
    }
    return list;
  }, [postList, search, statusFilter]);

  const handleDeleteConfirm = () => {
    if (!postToDelete) return;
    setErrorMsg("");
    deletePost(postToDelete._id, {
      onSuccess: () => setPostToDelete(null),
      onError: (err) => {
        const msg =
          err?.response?.data?.message || "Failed to delete post. Try again.";
        setErrorMsg(msg);
      },
    });
  };

  const handleStatusChange = (postId, status) => {
    updateStatus({ postId, status });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <PageHelmet
        title="Manage Posts | Xenly Admin"
        description="Review and manage posts across the platform."
      />
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Manage Posts
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Review, moderate, and manage all posts
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search posts or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition text-gray-600"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </header>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-left text-gray-500 text-xs uppercase tracking-wide">
                <th className="px-5 py-3.5 font-semibold">Post</th>
                <th className="px-5 py-3.5 font-semibold">Author</th>
                <th className="px-5 py-3.5 font-semibold">Engagement</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-5 py-4">
                      <div className="h-3 w-40 bg-gray-200 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-3 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-3 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="h-3 w-8 bg-gray-200 rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredPosts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-14 text-center text-gray-400 text-sm"
                  >
                    No posts found
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5 max-w-xs">
                      <div className="flex items-center gap-3">
                        {post.postImg?.url && (
                          <img
                            src={post.postImg.url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                          />
                        )}
                        <p className="text-gray-700 line-clamp-2 text-sm">
                          {post.content}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            post.author?.profileImage?.url ||
                            "/default_profile.webp"
                          }
                          alt={post.author?.name}
                          className="w-8 h-8 rounded-full object-cover border border-gray-100"
                        />
                        <div>
                          <p className="text-gray-800 text-xs font-medium leading-tight">
                            {post.author?.name}
                          </p>
                          <p className="text-gray-400 text-[11px]">
                            @{post.author?.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3 text-gray-500 text-xs">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-400" />
                          {post.reactCount ?? post.reacts?.length ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                          {post.commentCount ?? 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                          {post.shares?.length ?? 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
                          statusStyles[post.status] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {post.status !== "approved" && (
                          <button
                            onClick={() =>
                              handleStatusChange(post._id, "approved")
                            }
                            disabled={updating}
                            title="Approve"
                            className="p-1.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors disabled:opacity-50"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {post.status !== "rejected" && (
                          <button
                            onClick={() =>
                              handleStatusChange(post._id, "rejected")
                            }
                            disabled={updating}
                            title="Reject"
                            className="p-1.5 rounded-lg text-amber-600 bg-amber-50 hover:bg-amber-100 transition-colors disabled:opacity-50"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setErrorMsg("");
                            setPostToDelete(post);
                          }}
                          title="Delete"
                          className="p-1.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-150">
            <button
              onClick={() => setPostToDelete(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Delete this post?
            </h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              "{postToDelete.content}" by{" "}
              <span className="font-medium text-gray-700">
                {postToDelete.author?.name}
              </span>{" "}
              will be permanently removed.
            </p>

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setPostToDelete(null)}
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

export default ManagePosts;
