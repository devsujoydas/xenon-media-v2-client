import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAuth } from "../AuthProvider/AuthProviderNew";

const AdminPrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminPrivateRoutes;