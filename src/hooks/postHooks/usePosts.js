import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export const usePosts = ({
  search = "",
  status = "",
  page = null,
  limit = null,
  enabled = true,
} = {}) => {
  return useQuery({
    queryKey: ["posts", search, status, page, limit],
    queryFn: async () => {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (page) params.page = page;
      if (limit) params.limit = limit;

      const { data } = await api.get("/posts", { params });
      return data.posts;
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });
};

export const useUserPosts = (userId) => {
  return useQuery({
    queryKey: ["user-posts", userId],
    queryFn: async () => {
      const { data } = await api.get(`/posts/user/${userId}`);
      return data.posts;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
