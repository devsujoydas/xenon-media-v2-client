// hooks/postHooks/useUpdatePostStatus.js
import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../services/api";

export const useUpdatePostStatus = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, status }) => {
      const res = await api.patch(`/admin/posts/${postId}/status`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};