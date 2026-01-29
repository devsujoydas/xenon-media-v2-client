import { useState } from "react";
import toast from "react-hot-toast";

import AuthorInfo from "./AuthorInfo.jsx";
import PostContent from "./PostContent.jsx";
import PostStats from "./PostStats.jsx";
import ActionButtons from "./ActionButtons.jsx";
import CommentInput from "./CommentInput.jsx";
import { useAuth } from "../../AuthProvider/AuthProviderNew.jsx";
import api from "../../services/api.js";




const PostCard = ({ post, variant = "feed", onRemove }) => {
  const { user, } = useAuth();

  const [liked, setLiked] = useState(post?.likedByMe);
  const [likesCount, setLikesCount] = useState(post?.likesCount);

  const [reactorsUsers, setReactorsUsers] = useState(post?.likes || []);
  const [showMenu, setShowMenu] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const likeHandler = async () => {
    try {
      const { data } = await api.put(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}/like`);

      if (data.message === "Liked") {
        setLiked(true)
        setLikesCount(likesCount + 1)
        toast.success(data.message);
        setReactorsUsers(prev => {
          if (!prev.some(u => u._id === user._id)) return [...prev, user];
          return prev;
        });
      } else {
        setLiked(false)
        setLikesCount(likesCount - 1)
        toast.success(data.message);
        setReactorsUsers(prev => prev.filter(u => u._id !== user._id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
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
        likesCount={likesCount}
        likeHandler={likeHandler}
        liked={liked}
        post={post}
        user={user}
      // savePostHandler={savePostHandler}
      // removeSavedPostHandler={removeSavedPostHandler}
      />

      <hr className="text-zinc-300" />

      <CommentInput
        post={post}
        user={user}
      />
    </div>
  );
};

export default PostCard;
