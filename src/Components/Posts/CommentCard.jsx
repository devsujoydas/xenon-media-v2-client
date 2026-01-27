import { useState, useRef, useEffect } from "react";
import { FaEllipsisH, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return past.toLocaleDateString();
};

const CommentCard = ({ comment, currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAuthor = currentUser?.id === comment?.author?.id;

  const handleUpdate = () => {
    console.log("Update comment:", comment._id);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete comment:", comment._id);
    setMenuOpen(false);
  };

  const handleReport = () => {
    console.log("Report comment:", comment._id);
    setMenuOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-100 px-5 py-4">
      
      {/* Header */}
      <div className="flex items-start justify-between relative">
        <div className="flex gap-3">
          <img
            src={comment?.author?.profile?.profilePhoto || "/default-avatar.png"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-gray-900">
                {comment?.author?.name}
              </h4>
              <span className="text-xs text-gray-400">{timeAgo(comment?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* 3-dot menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition"
          >
            <FaEllipsisH />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-zinc-200 rounded-lg shadow-lg z-50">
              <ul className="flex flex-col text-sm">
                {isAuthor && (
                  <>
                    <li
                      onClick={handleUpdate}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      Update
                    </li>
                    <li
                      onClick={handleDelete}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                    >
                      Delete
                    </li>
                  </>
                )}
                <li
                  onClick={handleReport}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  Report
                </li>
              </ul>
            </div>
          )}
        </div>
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

        <button className="flex items-center gap-1 hover:text-red-500 transition">
          <FaThumbsDown />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
