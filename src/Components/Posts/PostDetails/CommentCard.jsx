// PostDetails/CommentCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import { useTimeAgo } from "../../../hooks/useTimeAgo";
import {
  useCommentReaction,
  useDeleteComment,
  useUpdateComment,
} from "../../../hooks/postHooks/useComments";

const DEFAULT_AVATAR = "/default-avatar.png";

const CommentCard = ({ comment, currentUser, onUpdated, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.text);

  const timeAgo = useTimeAgo(comment.createdAt);
  const isOwner = comment.author?._id === currentUser?._id;
  const canManage = isOwner || currentUser?.role === "admin";

  const { updateComment } = useUpdateComment(onUpdated);
  const { deleteComment } = useDeleteComment(onDeleted);
  const { likeComment, dislikeComment } = useCommentReaction(onUpdated);

  const saveEdit = async () => {
    if (!text.trim()) return;
    await updateComment(comment._id, text);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setText(comment.text);
    setIsEditing(false);
  };

  return (
    <div className="flex gap-3">
      <Link
        to={isOwner ? "/profile" : `/profile/${comment.author?.username}`}
        className="shrink-0"
      >
        <img
          src={comment.author?.profileImage?.url || DEFAULT_AVATAR}
          alt={comment.author?.name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="bg-zinc-100 rounded-2xl px-3 py-2">
          <p className="text-sm font-semibold flex items-center gap-1">
            {comment.author?.name}
            {isOwner && (
              <span className="text-[10px] font-normal bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full">
                You
              </span>
            )}
          </p>
          {isEditing ? (
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full text-sm mt-1 border-b border-zinc-400 outline-none bg-transparent"
              autoFocus
            />
          ) : (
            <p className="text-sm break-words">{comment.text}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-zinc-500 px-2">
          <span>{timeAgo}</span>

          <button
            onClick={() => likeComment(comment._id)}
            className={`flex items-center gap-1 ${comment.likedByMe ? "text-indigo-600" : "hover:text-zinc-700"}`}
          >
            {comment.likedByMe ? <BiSolidLike /> : <BiLike />}
            {comment.likesCount > 0 && comment.likesCount}
          </button>

          <button
            onClick={() => dislikeComment(comment._id)}
            className={`flex items-center gap-1 ${comment.dislikedByMe ? "text-red-600" : ""}`}
          >
            {comment.dislikedByMe ? <BiSolidDislike /> : <BiDislike />}
            {comment.dislikesCount > 0 && comment.dislikesCount}
          </button>

          {canManage && !isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                <MdEdit /> Edit
              </button>
              <button
                onClick={() => deleteComment(comment._id)}
                className="flex items-center gap-1 text-red-600"
              >
                <FaRegTrashCan /> Delete
              </button>
            </>
          )}

          {isEditing && (
            <>
              <button onClick={saveEdit} className="text-blue-600 font-medium">
                Save
              </button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
