import { FaEllipsisH, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return past.toLocaleDateString();
};

const CommentCard = ({ comment }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src={comment?.author?.profile?.profilePhoto}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-sm text-gray-900">
              {comment?.author?.name}
            </h4>
            <p className="text-xs text-gray-400">
              {timeAgo(comment?.createdAt)}
            </p>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <FaEllipsisH />
        </button>
      </div>

      {/* Comment text */}
      <p className="text-sm text-gray-700 leading-relaxed mt-3">
        {comment?.text}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
        <button className="flex items-center gap-1 hover:text-indigo-600 transition">
          <FaThumbsUp />
          <span>{comment?.likes?.length || 0}</span>
        </button>

        <button className="hover:text-red-500 transition">
          <FaThumbsDown />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
