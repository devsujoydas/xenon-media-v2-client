// hooks/userHooks/useDeleteUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query"; 
import api from "../../services/api";

export const useDeleteUser = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const res = await api.delete(`/admin/users/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};