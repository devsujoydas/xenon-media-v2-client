import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getMyFriends = async () => {
  const { data } = await api.get("/friends/myConnections");
  console.log(data)
  return data;
};

export const FRIENDS_QUERY_KEY = ["friends"];
export const useFriends = () => {
  return useQuery({
    queryKey: FRIENDS_QUERY_KEY,
    queryFn: getMyFriends,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
