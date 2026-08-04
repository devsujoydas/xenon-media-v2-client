// CommentItem.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { useTimeAgo } from "../../../hooks/useTimeAgo";
import { useUpdateComment, useDeleteComment, useCommentReaction } from "../../../hooks/postHooks/useComments";

const CommentItem = ({ comment, postId, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const { handleUpdateComment } = useUpdateComment(postId);
  const { handleDeleteComment } = useDeleteComment(postId);
  const { likeComment, dislikeComment } = useCommentReaction(postId);

  const isOwner = comment.author?._id === currentUser?._id;
  const timeAgo = useTimeAgo(comment.createdAt);

  const saveEdit = async () => {
    if (!text.trim()) return;
    await handleUpdateComment(comment._id, text);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3 py-3">
      <Link to={isOwner ? "/profile" : `/profile/${comment.author?.username}`}>
        <img
          src={comment.author?.profileImage?.url || "/default-avatar.png"}
          alt={comment.author?.name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
        />
      </Link>

      <div className="flex-1">
        <div className="bg-zinc-100 rounded-2xl px-3 py-2">
          <p className="text-sm font-semibold">{comment.author?.name}</p>
          {isEditing ? (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full text-sm mt-1 border-b border-zinc-400 outline-none bg-transparent"
              autoFocus
            />
          ) : (
            <p className="text-sm">{comment.text}</p>
          )}
        </div>

        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 px-2">
          <span>{timeAgo}</span>

          <button
            onClick={() => likeComment(comment._id)}
            className={`flex items-center gap-1 ${comment.liked ? "text-blue-600" : ""}`}
          >
            {comment.liked ? <BiSolidLike /> : <BiLike />}
            {comment.likesCount > 0 && comment.likesCount}
          </button>

          <button
            onClick={() => dislikeComment(comment._id)}
            className={`flex items-center gap-1 ${comment.disliked ? "text-red-600" : ""}`}
          >
            {comment.disliked ? <BiSolidDislike /> : <BiDislike />}
            {comment.dislikesCount > 0 && comment.dislikesCount}
          </button>

          {isOwner && !isEditing && (
            <>
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-1">
                <MdEdit /> Edit
              </button>
              <button
                onClick={() => handleDeleteComment(comment._id)}
                className="flex items-center gap-1 text-red-600"
              >
                <FaRegTrashCan /> Delete
              </button>
            </>
          )}

          {isEditing && (
            <>
              <button onClick={saveEdit} className="text-blue-600 font-medium">Save</button>
              <button onClick={() => { setIsEditing(false); setText(comment.text); }}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;