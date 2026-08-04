import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const useMyPosts = () => {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => {
      const { data } = await api.get("/posts/me");
      return data.posts;
    },
    enabled: true,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });
};
