import { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { ThumbsDown } from "lucide-react";
import { useTimeAgo } from "../../hooks/useTimeAgo";
import api from "../../services/api";
import toast from "react-hot-toast";

const CommentCard = ({ comment, post, currentUser }) => {
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

  const isAuthor = currentUser?._id === comment?.author?._id;

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

  const [liked, setLiked] = useState();
  const [disliked, setDisliked] = useState();
  const [likeCount, setLikeCount] = useState();
  const [dislikeCount, setDislikeCount] = useState();


  console.log(comment)



 
  const handleLike = async () => {
      
    try {
      const { data } = await api.put(
        `/posts/post/${post._id}/comments/${comment._id}/like`
      );
      
      toast.success(data.message);

    } catch (err) {
      toast.error("Failed to like comment");
    }
  };

  const handleDislike = async () => { 
  
    try {
      const { data } = await api.put(
        `/posts/post/${post._id}/comments/${comment._id}/dislike`
      );
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
            src={comment?.author?.profile?.profilePhoto || "/default-avatar.png"}
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
            ${liked ? "text-blue-600" : "text-gray-600"}`}
        >
          {liked ? <BiSolidLike size={18} /> : <BiLike size={18} />}
          <span>{likeCount}</span>
        </button>

        <button
          onClick={handleDislike}
          className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded-lg transition 
            ${disliked ? "text-red-500" : "text-gray-600"}`}
        >
          <ThumbsDown size={18} />
          <span>{dislikeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
