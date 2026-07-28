import UsersPosts from "../../Components/UsersPosts/UsersPosts";
import { useMyPosts } from "../../hooks/postHooks/useMyPosts";
import PostFrom from "./PostFrom";
 
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {

  const { data: myPosts, isLoading, isFetching, } = useMyPosts();


  return (
    <div className="relative min-h-screen flex md:flex-row flex-col-reverse bg-[#f1f5fa] lg:mt-0 mt-12">
      {/* Main content */}
      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-3 lg:px-5 px-3 ">
        <PostFrom />

        <div className="mt-3">
          <UsersPosts
            myPosts={myPosts}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-screen md:sticky md:top-0 overflow-y-auto">
        <ProfileSidebar myPosts={myPosts}/>
      </div>
    </div>
  );
};


export default Profile;
