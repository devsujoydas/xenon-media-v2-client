// hooks/postHooks/useDeletePost.js
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import api from "../../services/api";

export const useDeletePost = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId) => {
      const res = await api.delete(`/admin/posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};