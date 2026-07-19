import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

const getMyFriends = async () => {
  const { data } = await api.get("/users");
  console.log(data);
  return data;
};
const getYouMayKnowFriends = async () => {
  const { data } = await api.get("/friends/youMayKnow");
  console.log(data);
  return data;
};

export const useFriends = () => {
  return useQuery({
    queryKey: ["friends"],
    queryFn: getMyFriends,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export const YOUMAYKNOW_FRIENDS_QUERY_KEY = ["youmayknowfriends"];
export const useYouMayKnowFriends = () => {
  return useQuery({
    queryKey: YOUMAYKNOW_FRIENDS_QUERY_KEY,
    queryFn: getYouMayKnowFriends,
    staleTime: 1000 * 60,
    retry: 1,
  });
};

export const useAddFriendHandler = async () => {};
