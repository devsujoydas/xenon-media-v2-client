import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Components/Loading/Loading";
import { useAuth } from "../AuthProvider/AuthProviderNew";
import ChangePasswordModal from "../Components/Modals/ChangePasswordModal";
import { useState } from "react";

const Layout = () => {
  const { loading } = useAuth();
const [showChangePassModal, setShowChangePassModal] = useState(false);

  return (
    <div className="">
      {loading ? (
        <Loading />
      ) : (
        <div className=" border-orange-500 bg-white grid lg:grid-cols-4   relative ">
          <div className="lg:col-span-1 border-zinc-500 relative">
            <ChangePasswordModal
              isOpen={showChangePassModal}
              onClose={() => setShowChangePassModal(false)}
            />
            <Navbar setShowChangePassModal={setShowChangePassModal}/>
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
