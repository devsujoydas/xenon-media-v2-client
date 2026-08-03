import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = ({
  search = "",
  role = "",
  online = "",
  enabled = true,
} = {}) => {
  return useQuery({
    queryKey: ["all-users", search, role, online],
    queryFn: async () => {
      const params = {};
      if (search) params.search = search;
      if (role) params.role = role;
      if (online) params.online = online;

      const { data } = await api.get("/users", { params });
      return data; // { users, userCounts }
    },
    enabled,
  });
};
