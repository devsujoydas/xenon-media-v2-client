// hooks/useComments.js
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast"; 
import api from "../../services/api";

// ---------- Fetch + list state for a post's comments ----------
export const useComments = (postId, sort = "recent") => {
  const [commentsData, setCommentsData] = useState({ totalComments: 0, comments: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/posts/post/${postId}/comments`, {
        params: { sort },
      });
      setCommentsData(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [postId, sort]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { commentsData, setCommentsData, loading, error, refetch: fetchComments };
};

// ---------- Create ----------
export const useCreateComment = (postId, onSuccess) => {
  const [submitting, setSubmitting] = useState(false);

  const createComment = async (text) => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post(`/posts/post/${postId}/comment`, { text });
      toast.success("Comment added");
      onSuccess?.(data.comment);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return { createComment, submitting };
};

// ---------- Update ----------
export const useUpdateComment = (onSuccess) => {
  const updateComment = async (commentId, text) => {
    if (!text.trim()) return;
    try {
      const { data } = await api.put(`/posts/comment/${commentId}`, { text });
      toast.success("Comment updated");
      onSuccess?.(commentId, data.comment);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update comment");
    }
  };

  return { updateComment };
};

// ---------- Delete ----------
export const useDeleteComment = (onSuccess) => {
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/posts/comment/${commentId}`);
      toast.success("Comment deleted");
      onSuccess?.(commentId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete comment");
    }
  };

  return { deleteComment };
};

// ---------- Like / Dislike ----------
export const useCommentReaction = (onSuccess) => {
  const likeComment = async (commentId) => {
    try {
      const { data } = await api.put(`/posts/comment/${commentId}/like`);
      onSuccess?.(commentId, data.comment);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const dislikeComment = async (commentId) => {
    try {
      const { data } = await api.put(`/posts/comment/${commentId}/dislike`);
      onSuccess?.(commentId, data.comment);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return { likeComment, dislikeComment };
};