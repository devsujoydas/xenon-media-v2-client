// hooks/useSavedPosts.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
 
 
import api from "../../services/api";
import { useAuth } from "../../AuthProvider/AuthProviderNew";

export const useSavedPosts = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const { data } = await api.get("/posts/me/saved");
      return data; 
    },
    enabled: isAuthenticated,
    staleTime: 60 * 1000,
  });
};

export const useIsPostSaved = (postId) => {
  const { data } = useSavedPosts();
  return !!data?.posts?.some((p) => p._id === postId);
};

export const useToggleSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post) => {
      const { data } = await api.put(`/posts/post/${post._id}/save`);
      return data;
    },
    onMutate: async (post) => {
      await queryClient.cancelQueries({ queryKey: ["savedPosts"] });
      const prev = queryClient.getQueryData(["savedPosts"]);
      const wasSaved = prev?.posts?.some((p) => p._id === post._id);

      queryClient.setQueryData(["savedPosts"], (old) => {
        if (!old) return old;
        return wasSaved
          ? {
              ...old,
              posts: old.posts.filter((p) => p._id !== post._id),
              totalPosts: old.totalPosts - 1,
            }
          : {
              ...old,
              posts: [post, ...old.posts],
              totalPosts: old.totalPosts + 1,
            };
      });

      return { prev };
    },
    onError: (err, post, context) => {
      if (context?.prev) queryClient.setQueryData(["savedPosts"], context.prev);
      console.error(err);
      toast.error("Something went wrong!");
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });
};