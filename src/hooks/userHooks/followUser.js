import api from "../../services/api";

 
// POST /follow/users/:userId/follow
export const followUser = async (userId) => {
  const { data } = await api.post(`/follow/users/${userId}/follow`);
  return data;
};

// DELETE /follow/users/:userId/follow
export const unfollowUser = async (userId) => {
  const { data } = await api.delete(`/follow/users/${userId}/follow`);
  return data;
};

// GET /follow/users/:userId/follow-status
export const fetchFollowStatus = async (userId) => {
  const { data } = await api.get(`/follow/users/${userId}/follow-status`);
  return data; // { isFollowing }
};

// GET /follow/users/:userId/followers?page=&limit=
export const fetchFollowers = async (userId, page = 1, limit = 20) => {
  const { data } = await api.get(`/follow/users/${userId}/followers`, {
    params: { page, limit },
  });
  return data;
};

// GET /follow/users/:userId/following?page=&limit=
export const fetchFollowing = async (userId, page = 1, limit = 20) => {
  const { data } = await api.get(`/follow/users/${userId}/following`, {
    params: { page, limit },
  });
  return data;
};