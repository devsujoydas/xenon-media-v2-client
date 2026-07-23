import api from "../../services/api";

// GET /users?search=&role=
export const fetchAllUsers = async (search = "") => {
  const { data } = await api.get("/users", {
    params: search ? { search } : {},
  });
  console.log(data);
  return data; // { userCounts, users }
};

// GET /users/profile/:userId
export const fetchUserProfile = async (userId) => {
  const { data } = await api.get(`/users/profile/${userId}`);
  console.log(data);
  return data; // { user }
};

// GET /users/user/:userId?search=
// export const fetchUserPosts = async (userId, search = "") => {
//   const { data } = await api.get(`/posts/user/${userId}`, {
//     params: search ? { search } : {},
//   });
//   return data; // { totalPosts, posts }
// };


