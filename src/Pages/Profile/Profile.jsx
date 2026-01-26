import PostFromAndPost from "./PostFromAndPost";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  return (
    <div className="relative min-h-screen flex md:flex-row flex-col-reverse bg-[#f1f5fa] lg:mt-0 mt-12">
      {/* Main content */}
      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-3 lg:px-5 px-3 ">
        <PostFromAndPost />
      </div>

      {/* Sidebar */}
      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-screen md:sticky md:top-0 overflow-y-auto">
        <ProfileSidebar />
      </div>
    </div>
  );
};


export default Profile;
