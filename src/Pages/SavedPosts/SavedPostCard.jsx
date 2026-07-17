import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { FaCopy, FaArchive, FaBookmark } from "react-icons/fa";
import { IoBookmark, IoSettings } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { ImAttachment } from "react-icons/im";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { FaRegSmile } from "react-icons/fa";
// import { useAuth } from "../../hooks/useAuth";

const SavedPostCard = ({ post }) => {
  const { userData, removeSavedPostHandler } = useAuth()

  const [menuOpen, setMenuOpen] = useState(false);
  const [like, setLike] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);

  const btnStyle =
    "w-full px-3 py-1 rounded-md flex items-center gap-1 transition-all active:scale-95 hover:bg-zinc-200 cursor-pointer";

  useEffect(() => {
    if (post.likes?.some(u => u._id === userData?._id)) {
      setLike(true);
    }
  }, [post.likes, userData?._id]);

  const likeHandler = async () => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`,
        { userId: userData?._id }
      );

      if (data.message === "Liked") {
        setLike(true);
        setLikesCount((prev) => prev + 1);
        toast.success("Liked!");
      } else if (data.message === "Disliked") {
        setLike(false);
        setLikesCount((prev) => prev - 1);
        toast.success("Disliked!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;

  const sharePostHandler = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post URL copied!"))
      .catch((err) => console.error("Copy failed:", err));
  };

  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl bg-white">
      {/* Header */}
      <div className="flex justify-between items-center p-3 md:px-5 md:py-3">
        <Link to={`/profile/${post.author?._id}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img
                src={post.author?.profilePhoto || "/default.jpg"}
                alt="author"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-semibold text-md">{post.author?.name}</h1>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <p>{new Date(post?.createdAt).toLocaleString()}</p>
                {post?.updatedAt && (
                  <span className="text-emerald-700 font-semibold">Updated</span>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Menu */}
        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <BsThreeDotsVertical className="p-2 text-3xl text-zinc-500 hover:text-black rounded-full hover:bg-zinc-200 transition-all" />
          </button>

          {menuOpen && (
            <div
              onMouseLeave={() => setMenuOpen(false)}
              className="absolute top-10 right-0 w-48 bg-white border border-zinc-300 shadow-2xl p-2 rounded-md space-y-2 z-20"
            >
              <button onClick={sharePostHandler} className={`${btnStyle} bg-zinc-100`}>
                <FaCopy /> Copy URL
              </button>
              <button
                onClick={() => removeSavedPostHandler(post)}
                className={`${btnStyle} bg-zinc-100`}
              >
                <FaBookmark /> Remove Post
              </button>
              <button className={btnStyle}>
                <IoSettings /> Hide Post
              </button>
              <hr />
              <button className={btnStyle}>
                <FaArchive /> Report Post
              </button>
            </div>
          )}
        </div>
      </div>

      <hr />

      {/* Content */}
      <div className="px-3 md:px-5 space-y-2">
        {post?.content?.text && (
          <p className="text-sm font-semibold">{post.content.text}</p>
        )}

        {post?.content?.postImageUrl && (
          <Link to={`/post/${post._id}`}>
            <img
              src={post.content.postImageUrl}
              alt="post"
              className="w-full object-cover rounded-lg md:h-[550px] h-56"
            />
          </Link>
        )}

        {/* Stats */}
        <div className="flex justify-between items-center mt-2 text-sm px-2">
          <div className="flex items-center gap-1">
            <img className="w-4 h-4 md:w-5 md:h-5" src="/like.png" alt="likes" />
            <p className="text-zinc-600">
              {likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </p>
          </div>
          <div className="flex gap-3 text-zinc-600">
            <p>{post.comments?.length || 0} Comments</p>
            <p>{post.shares?.length || 0} Shares</p>
          </div>
        </div>

        <hr />

        {/* Actions */}
        <div className="flex justify-between items-center my-1">
          <div className="flex items-center md:gap-2">
            <button onClick={likeHandler} className={btnStyle}>
              {like ? (
                <BiSolidLike className="text-blue-500 text-xl" />
              ) : (
                <BiLike className="text-xl" />
              )}
              <span className={like ? "text-blue-500" : "text-black"}>Like</span>
            </button>

            <button className={btnStyle}>
              <BiCommentDots className="text-xl" /> Comment
            </button>

            <button onClick={sharePostHandler} className={btnStyle}>
              <PiShareFatBold className="text-xl" /> Share
            </button>
          </div>

          <IoBookmark
            onClick={() => removeSavedPostHandler(post)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      <hr />

      {/* Comment Input */}
      <form className="flex justify-between items-center gap-3 p-3 md:p-4">
        <div className="flex items-center gap-3 w-full">
          <Link to={`/profile`}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden">
              <img
                src={userData?.profileImage.url}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <input
            type="text"
            placeholder="Write your comment..."
            className="w-full border border-zinc-400 outline-none text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 rounded-full"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
            <ImAttachment />
          </div>
          <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
            <FaRegSmile />
          </div>
          <div className="p-2 md:p-3 border border-blue-700 text-blue-700 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white">
            <VscSend />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SavedPostCard;
