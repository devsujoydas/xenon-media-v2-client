import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProviderNew";
import Loading from "../Components/Loading/Loading";

const AuthPrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default AuthPrivateRoutes;
