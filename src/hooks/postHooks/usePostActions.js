// hooks/usePostActions.js
import { useState } from "react";
import toast from "react-hot-toast"; 
import api from "../../services/api";

// ---------- React / Unreact ----------
export const useReactPost = (post) => {
  const [reacted, setReacted] = useState(post.isReacted ?? post.reacted ?? false);
  const [reactCount, setReactCount] = useState(post.reactCount ?? post.reacts?.length ?? 0);

  const toggleReact = async () => {
    const prevReacted = reacted;
    const prevCount = reactCount;

    setReacted(!prevReacted);
    setReactCount(prevReacted ? prevCount - 1 : prevCount + 1);

    try {
      const { data } = await api.patch(`/posts/post/${post._id}/react`);
      setReacted(data.reacted);
      setReactCount(data.reactCount);
    } catch (err) {
      console.error(err);
      setReacted(prevReacted);
      setReactCount(prevCount);
      toast.error("Something went wrong!");
    }
  };

  return { reacted, reactCount, toggleReact };
};

// ---------- Delete post ----------
export const useDeletePost = () => {
  const [deleting, setDeleting] = useState(false);

  const deletePost = async (postId) => {
    setDeleting(true);
    try {
      await api.delete(`/posts/post/${postId}`);
      return true;
    } catch (err) {
      console.error(err);
      toast.error("Couldn't delete post");
      return false;
    } finally {
      setDeleting(false);
    }
  };

  return { deletePost, deleting };
};