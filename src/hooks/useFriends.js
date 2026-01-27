import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useFriends = (userId) => {
  return useQuery({
    queryKey: ["friends", userId],
    queryFn: async () => {
      const { data } = await api.get(`/friends/${userId}`);
      return data;
    },
    enabled: !!userId, 
  });
};
