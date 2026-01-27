import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useAuth } from "../AuthProvider/AuthProviderNew";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};


export default PrivateRoute;
