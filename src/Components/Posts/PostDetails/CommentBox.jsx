// PostDetails/CommentBox.jsx
import { useState, useCallback } from "react";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import CommentSkeleton from "./CommentSkeleton";
import { useAuth } from "../../../AuthProvider/AuthProviderNew"; 
import { useComments } from "../../../hooks/postHooks/useComments";

const CommentBox = ({ post }) => {
  const [sortType, setSortType] = useState("recent");
  const { user } = useAuth();
  const { commentsData, setCommentsData, loading } = useComments(post?._id, sortType);

  const handleCommentAdded = useCallback((newComment) => {
    setCommentsData((prev) => ({
      totalComments: (prev.totalComments || 0) + 1,
      comments: [newComment, ...(prev.comments || [])],
    }));
  }, [setCommentsData]);

  const handleCommentUpdated = useCallback((commentId, updated) => {
    setCommentsData((prev) => ({
      ...prev,
      comments: prev.comments.map((c) => (c._id === commentId ? updated : c)),
    }));
  }, [setCommentsData]);

  const handleCommentDeleted = useCallback((commentId) => {
    setCommentsData((prev) => ({
      totalComments: Math.max((prev.totalComments || 1) - 1, 0),
      comments: prev.comments.filter((c) => c._id !== commentId),
    }));
  }, [setCommentsData]);

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 overflow-hidden">
      <div className="pb-3 border-b">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Comments</span>
            <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full">
              {commentsData?.totalComments || 0}
            </span>
          </div>

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="relevant">Most Relevant</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-3 pr-2 scrollbar-hide flex flex-col gap-3">
        {loading && (
          <div className="flex flex-col gap-4 mt-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <CommentSkeleton key={idx} />
            ))}
          </div>
        )}

        {!loading && commentsData?.comments?.length > 0 ? (
          commentsData.comments.map((cmt) => (
            <CommentCard
              key={cmt._id}
              comment={cmt}
              currentUser={user}
              onUpdated={handleCommentUpdated}
              onDeleted={handleCommentDeleted}
            />
          ))
        ) : (
          !loading && (
            <p className="text-sm text-gray-400 text-center mt-10">No comments yet</p>
          )
        )}
      </div>

      <CommentForm post={post} user={user} onCreated={handleCommentAdded} />
    </div>
  );
};

export default CommentBox;