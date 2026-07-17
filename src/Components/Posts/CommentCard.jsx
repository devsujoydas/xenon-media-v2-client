import { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { BiSolidDislike, BiLike, BiSolidLike, BiDislike } from "react-icons/bi"; 
import { useTimeAgo } from "../../hooks/useTimeAgo";
import api from "../../services/api";
import toast from "react-hot-toast";

const CommentCard = ({ comment, post, currentUser }) => {

  const isAuthor = currentUser?._id === comment?.author?._id;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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

 
  const [likedByMe, setLikedByMe] = useState(comment.likedByMe);
  const [dislikedByMe, setDisLikedByMe] = useState(comment.dislikedByMe);
  const [likeCount, setLikeCount] = useState(comment.likesCount);
  const [dislikeCount, setDislikeCount] = useState(comment.dislikesCount);
 

  const handleLike = async () => {
    try {
      const { data } = await api.put(
        `/posts/comments/${comment._id}/like`
      );
      setLikedByMe(data.likedByMe)
      setLikeCount(data.likesCount)
      setDisLikedByMe(data.dislikedByMe)
      setDislikeCount(data.dislikedCount)
      toast.success(data.message);
      
    } catch (err) {
      toast.error("Failed to like comment");
    }
  };
  
  const handleDislike = async () => {
    try {
      const { data } = await api.put(
        `/posts/comments/${comment._id}/dislike`
      );
      setLikedByMe(data.likedByMe)
      setLikeCount(data.likedCount)
      setDisLikedByMe(data.dislikedByMe)
      setDislikeCount(data.dislikesCount)
      toast.success(data.message);

    } catch (err) {
      toast.error("Failed to dislike comment");

    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200 px-4 py-3 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between relative">
        <div className="flex gap-3 items-center">
          <img
            src={comment?.author?.profileImage.url }
            alt="user"
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm text-gray-900">{comment?.author?.name}</h4>
              <span className="text-xs text-gray-400">{useTimeAgo(comment?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* 3-dot menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition"
          >
            <FaEllipsisH />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
              <ul className="flex flex-col text-sm">
                {isAuthor && (
                  <>
                    <li
                      onClick={handleUpdate}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 rounded-t-xl transition"
                    >
                      Update
                    </li>
                    <li
                      onClick={handleDelete}
                      className="px-4 py-2 hover:bg-red-100 cursor-pointer text-red-600 rounded-b-xl transition"
                    >
                      Delete
                    </li>
                  </>
                )}
                {!isAuthor && (
                  <li
                    onClick={handleReport}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 rounded-xl transition"
                  >
                    Report
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Comment text */}
      <p className="text-sm text-gray-700 leading-relaxed mt-2">{comment?.text}</p>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg transition 
            ${likedByMe ? "text-blue-600" : "text-gray-600"}`}
        >
          {likedByMe ? <BiSolidLike size={18} /> : <BiLike size={18} />}
          <span>{likeCount}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg transition 
            ${dislikedByMe ? "text-red-500" : "text-gray-600"}`}
        >
          {dislikeCount ? <BiSolidDislike size={18} /> : < BiDislike size={18} />}
          <span>{dislikeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
