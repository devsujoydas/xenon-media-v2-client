import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useMyPosts = () => {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts/my");
      return data.posts;
    },
    enabled: true,
  });
};
