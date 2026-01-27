import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import AuthorInfo from "./AuthorInfo.jsx";
import PostContent from "./PostContent.jsx";
import PostStats from "./PostStats.jsx";
import ActionButtons from "./ActionButtons.jsx";
import CommentInput from "./CommentInput.jsx";
import { useAuth } from "../../AuthProvider/AuthProviderNew.jsx";
// import { useAuth } from "../../hooks/useAuth.js";

const PostCard = ({ post, variant = "feed", onRemove }) => {
  const { user, savePostHandler, removeSavedPostHandler } = useAuth();

  const initialLiked = user
    ? post.likes.some(u => u._id === user._id)
    : false;

  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(post.likes.length || 0);
  const [reactorsUsers, setReactorsUsers] = useState(post.likes || []);
  const [showMenu, setShowMenu] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const likeHandler = async () => {
    if (!user?._id) return toast.error("Please login first");

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`,
        { userId: user._id }
      );

      const { message, likesCount: newLikesCount } = data;
      setLikesCount(newLikesCount);

      if (message === "Liked") {
        setLiked(true);
        setReactorsUsers(prev => {
          if (!prev.some(u => u._id === user._id)) return [...prev, user];
          return prev;
        });
        toast.success("Liked!");
      } else {
        setLiked(false);
        setReactorsUsers(prev => prev.filter(u => u._id !== user._id));
        toast.success("Disliked!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const sharePostHandler = () => {
    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`;
    navigator.clipboard.writeText(url).then(() => toast.success("Post URL Copied!"));
  };

  return (
    <div className="shadow-xl  border-t border-t-zinc-300 md:w-full   rounded-2xl md:rounded-3xl bg-white">
      <AuthorInfo
        post={post}
        user={user}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        variant={variant}
        onRemove={onRemove}
      />

      <hr className="text-zinc-300" />

      <PostContent post={post} />

      <PostStats
        reactorsUsers={reactorsUsers}
        showUsers={showUsers}
        setShowUsers={setShowUsers}
        post={post}
      />

      <hr className="text-zinc-300" />

      <ActionButtons
        liked={liked}
        likesCount={likesCount}
        likeHandler={likeHandler}
        sharePostHandler={sharePostHandler}
        post={post}
        user={user}
        savePostHandler={savePostHandler}
        removeSavedPostHandler={removeSavedPostHandler}
      />

      <hr className="text-zinc-300" />

      <CommentInput user={user} />
    </div>
  );
};

export default PostCard;
