import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx"; 
// import { useAuth } from "../../hooks/useAuth.js";

const AuthorInfo = ({ post, userData, showMenu, setShowMenu, variant, onDelete, onRemove, }) => {
  return (
    <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">
      <Link
        to={
          post.author._id === userData?._id
            ? "/profile"
            : `/profile/${post.author._id}`
        }
      >
        <div className="flex items-center gap-3">
          <img
            src={post.author?.profileImage.url}
            alt={post.author.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
          />
          <div>
            <h1 className="font-semibold text-md cursor-pointer">
              {post.author.name}
            </h1>
            <p className="text-zinc-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
              {post.updatedAt && (
                <span className="text-emerald-700 font-semibold ml-2">
                  Updated
                </span>
              )}
            </p>
          </div>
        </div>
      </Link>

      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}>
          <BsThreeDotsVertical className="text-4xl text-zinc-500 hover:text-black rounded-full transition-all p-2 cursor-pointer" />
        </button>
        {showMenu && (
          <ThreeDotMenu
            post={post}
            variant={variant}
            onDelete={onDelete}
            onRemove={onRemove}
            setShowMenu={setShowMenu}
          />
        )}
      </div>
    </div>
  );
};

const PostContent = ({ post }) => (
  <div className="md:px-5 space-y-2">
    {post.content.text && (
      <p className="px-2 pt-2 text-sm font-semibold">{post.content.text}</p>
    )}
    {post.content.postImageUrl && (
      <Link to={`/post/${post._id}`}>
        <img
          src={post.content.postImageUrl}
          alt="Post"
          className="w-full object-cover rounded-lg md:h-[550px] h-56"
        />
      </Link>
    )}
  </div>
);

const PostStats = ({ reactorsUsers, showUsers, setShowUsers, post }) => (
  <div className="flex justify-between items-center mt-2 text-sm px-4 pb-2">
    <div className="flex items-center gap-1">
      <img
        src="/like.png"
        alt="Like"
        className="w-4 h-4 md:w-5 md:h-5 rounded-full"
      />
      {reactorsUsers.length > 0 && (
        <div
          className="flex gap-1 cursor-pointer relative"
          onMouseEnter={() => setShowUsers(true)}
        >
          {showUsers && (
            <div className="absolute bottom-8  left-0 z-10 bg-black/70 text-white p-3 rounded-lg flex flex-col space-y-1 shadow-lg">
              {reactorsUsers.map((user, idx) => (
                <Link
                  key={idx}
                  to={user.username}
                  className="hover:underline w-full"
                >
                  {user.name}
                </Link>
              ))}
            </div>
          )}
          <p className="text-zinc-600 hidden md:block">
            {(() => {
              const names = reactorsUsers.map((u) => u.name);
              const others = names.length - 2;
              const display = names.slice(0, 2).join(", ");
              return others > 0 ? `${display} and ${others} others` : display;
            })()}
          </p>
        </div>
      )}
    </div>

    <div className="flex items-center gap-3 text-sm">
      <div>{post.comments.length} Comments</div>
      <div>{post.shares.length} Shares</div>
    </div>
  </div>
);

const ActionButtons = ({ liked, likesCount, likeHandler, sharePostHandler, post, userData, savePostHandler, }) => (
  <div className="flex justify-between items-center py-2 border-t px-2 border-gray-200">
    {/* Left side: Like, Comment, Share */}
    <div className="flex items-center w-full justify-around md:justify-start md:gap-4">
      {/* Like Button */}
      <button
        onClick={likeHandler}
        className={`flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all active:scale-95
          ${liked
            ? "text-blue-600 bg-blue-50"
            : "text-gray-600 hover:bg-gray-100"
          }
        `}
      >
        {liked ? (
          <BiSolidLike className="text-xl" />
        ) : (
          <BiLike className="text-xl" />
        )}
        <span className="flex items-center gap-1 text-sm font-medium">
          {likesCount}
          <span className="hidden md:inline">Like</span>
        </span>
      </button>

      {/* Comment Button */}
      <button
        className="flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-gray-600 
                   hover:bg-gray-100 transition-all active:scale-95"
      >
        <BiCommentDots className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Comments</span>
      </button>

      {/* Share Button */}
      <button
        onClick={sharePostHandler}
        className="flex items-center gap-1 md:gap-2 px-3 py-2 rounded-lg text-gray-600 
                   hover:bg-gray-100 transition-all active:scale-95"
      >
        <PiShareFatBold className="text-xl" />
        <span className="hidden md:inline text-sm font-medium">Shares</span>
      </button>
    </div>
 
    <div className="ml-2">
      {userData?.savedPosts?.some((p) => p._id === post._id) ? (
        <FaBookmark
          onClick={() => savePostHandler(post)}
          className="text-2xl text-blue-600 cursor-pointer active:scale-95 transition-all"
        />
      ) : (
        <CiBookmark
          onClick={() => savePostHandler(post)}
          className="text-2xl text-gray-600 cursor-pointer hover:text-blue-600 active:scale-95 transition-all"
        />
      )}
    </div>
  </div>
);

const CommentInput = ({ userData }) => (
  <form className="p-3 md:p-4 flex justify-between items-center gap-2 md:gap-20">
    <div className="flex items-center gap-2 md:gap-4 w-full ">
      <Link to="/profile" className="w-10 h-10 md:w-12 md:h-12">
        <img
          src={userData?.profile.profileImage.url}
          alt={userData?.name}
          className="w-full h-full rounded-full object-cover"
        />
      </Link>
      <input
        type="text"
        placeholder="Write your comment..."
        className="md:w-full border border-zinc-400 outline-none text-xs md:text-sm py-2 md:py-3 px-2 md:px-4 rounded-full"
      />
    </div>

    <div className="flex items-center gap-2 md:gap-3 ">
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
);

const PostCard = ({ post, variant = "feed", onDelete, onRemove }) => {
  const { userData, savePostHandler } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length || 0);
  const [reactorsUsers, setReactorsUsers] = useState(post.likesDetails || []);
  const [showMenu, setShowMenu] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const likeCommentStyle =
    "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1";

  useEffect(() => {
    if (userData?._id) {
      const liked = post.likes.some(
        (id) => id.toString() === userData._id.toString()
      );
      setLiked(liked);
    }
  }, [post.likes, userData]);

  const likeHandler = async () => {
    if (!userData?._id) return toast.error("Please login first");

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`,
        { userId: userData._id }
      );

      const { message, likesCount } = data;

      setLiked(message === "Liked");
      setLikesCount(likesCount);

      if (message === "Liked") {
        setReactorsUsers([...reactorsUsers, userData]);
        toast.success("Liked!");
      } else {
        setReactorsUsers(reactorsUsers.filter((u) => u._id !== userData._id));
        toast.success("Disliked!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };


  const sharePostHandler = () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post URL Copied!"));
  };
  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl md:rounded-3xl bg-white">
      {/* Author */}
      <AuthorInfo
        post={post}
        userData={userData}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        variant={variant}
        onDelete={onDelete}
        onRemove={onRemove}
      />

      <hr className="text-zinc-300" />

      {/* Content */}
      <PostContent post={post} />

      {/* Stats */}
      <PostStats
        reactorsUsers={reactorsUsers}
        showUsers={showUsers}
        setShowUsers={setShowUsers}
        post={post}
      />

      <hr className="text-zinc-300" />

      {/* Actions */}
      <ActionButtons
        liked={liked}
        likesCount={likesCount}
        likeHandler={likeHandler}
        likeCommentStyle={likeCommentStyle}
        sharePostHandler={sharePostHandler}
        post={post}
        userData={userData}
        savePostHandler={savePostHandler}
      />

      <hr className="text-zinc-300" />

      {/* Comment Input */}
      <CommentInput userData={userData} />
    </div>
  );
};

export default PostCard;
