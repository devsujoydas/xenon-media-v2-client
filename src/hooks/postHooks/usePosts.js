import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

// Get all posts
export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts");
      return data.posts;
    },
  });
};

// Get posts of a specific user
export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const { data } = await api.get(`/posts/user/${userId}`);
 
      return data.posts;
    },
    enabled: !!userId, // fetch only when userId exists
  });
};