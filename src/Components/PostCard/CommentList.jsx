// CommentList.jsx
import { useState } from "react";
import { useComments } from "../../hooks/postHooks/useComments.js";
import CommentItem from "./CommentItem.jsx";

const CommentList = ({ postId, currentUser }) => {
  const [sort, setSort] = useState("recent");
  const { data, isLoading, isError } = useComments(postId, sort);

  if (isLoading) return <p className="text-sm text-zinc-500 px-4 py-3">Loading comments...</p>;
  if (isError) return <p className="text-sm text-red-500 px-4 py-3">Couldn't load comments.</p>;

  return (
    <div className="px-4">
      <div className="flex justify-between items-center py-2">
        <p className="text-sm font-semibold">{data?.totalComments || 0} Comments</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-xs border border-zinc-300 rounded-md px-2 py-1 outline-none"
        >
          <option value="recent">Most recent</option>
          <option value="relevant">Most relevant</option>
        </select>
      </div>

      {data?.comments?.length ? (
        data.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId} currentUser={currentUser} />
        ))
      ) : (
        <p className="text-sm text-zinc-500 py-3">No comments yet. Be the first!</p>
      )}
    </div>
  );
};

export default CommentList;