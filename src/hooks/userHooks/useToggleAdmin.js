// hooks/userHooks/useToggleAdmin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

export const useToggleAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, makeAdmin }) => {
      const url = makeAdmin
        ? `/admin/make/${userId}`
        : `/admin/remove/${userId}`;
      const res = await axiosSecure.put(url);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};