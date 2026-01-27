import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Components/Loading/Loading"; 
import { useAuth } from "../AuthProvider/AuthProviderNew";

const Layout = () => {
  const { loading } = useAuth()

  return (
    <div className="font-family-poppins">  

      {loading ? (
        <Loading />
      ) : (
        <div className=" border-orange-500 bg-white grid lg:grid-cols-4   relative ">
          <div className="lg:col-span-1 border-zinc-500 relative">
            <Navbar />
          </div>

          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
