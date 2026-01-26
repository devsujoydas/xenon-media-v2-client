import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProviderNew = ({ children }) => {

  const fetchProfile = async () => {
    const { data } = await api.get("/users/profile");
    return data;
  };

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("accessToken");
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const value = {
    user: isError ? null : user,
    loading: isLoading || isFetching, // 🔥 GLOBAL AUTH LOADING
    isAuthenticated: !!user && !isError,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
