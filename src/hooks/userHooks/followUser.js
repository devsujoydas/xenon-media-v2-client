import api from "../../services/api";

 
// POST /follow/users/:userId/follow
export const followTogglerUser = async (userId) => {
  const { data } = await api.patch(`/follow/users/${userId}/follow`);
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