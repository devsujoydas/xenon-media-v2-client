import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { PiShareFatBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import toast from "react-hot-toast";

const ActionButtons = ({
  likesCount,
  liked,
  likeHandler,
  post,
  savePostHandler,
  removeSavedPostHandler,
}) => {


  const sharePostHandler = () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Post URL Copied!"));
  };
  const { savedPosts } = useAuth()
  const isSaved = savedPosts?.some((p) => p._id === post._id);

  return (
    <div className="flex justify-between items-center py-2 border-t px-2 border-gray-200">

      <div className="flex items-center w-full gap-5 md:justify-start md:gap-4">

        <button
          onClick={likeHandler}
          className={`flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg transition-all active:scale-95
            ${liked ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"}
           cursor-pointer`}
        >
          {liked ? <BiSolidLike className="text-xl" /> : <BiLike className="text-xl" />}
          <span className="flex items-center gap-1 text-sm font-medium">
            {likesCount}
            <span className="hidden md:inline">Like</span>
          </span>
        </button>

        <Link to={`/post/${post._id}`}>
          <button
            className="flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg text-gray-600 
                     hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
          >
            <BiCommentDots className="text-xl" />
            <span className="hidden md:inline text-sm font-medium">Comments</span>
          </button>
        </Link>

        <button
          onClick={sharePostHandler}
          className="flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg text-gray-600 
                     hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
        >
          <PiShareFatBold className="text-xl" />
          <span className="hidden md:inline text-sm font-medium">Shares</span>
        </button>
      </div>

      <div className="ml-2 cursor-pointer">
        {isSaved ? (
          <IoBookmark
            onClick={() => removeSavedPostHandler(post)}
            className="md:text-2xl text-blue-600 active:scale-95 transition-all"
          />
        ) : (
          <CiBookmark
            onClick={() => savePostHandler(post)}
            className="md:text-2xl text-gray-600 hover:text-blue-600 active:scale-95 transition-all"
          />
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
