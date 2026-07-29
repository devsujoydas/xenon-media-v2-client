import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (search = "") => {
  return useQuery({
    queryKey: ["all-users", search],
    queryFn: async () => {
      const { data } = await api.get("/users", {
        params: search ? { search } : {},
      });
      return data;
    },
  });
};