import { useAuth } from "../../AuthProvider/AuthProviderNew";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";
import Posts from "../../Components/Posts/Posts";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";
import { useMyPosts } from "../../hooks/postHooks/useMyPosts";
import UserProfileTop from "../AllUsersPage/UserProfileTop";
import ContactInfo from "./ContactInfo";
import PostFrom from "./PostFrom";

const Profile = () => {
  const { user } = useAuth();
  const { data: myPosts, isLoading, isFetching } = useMyPosts();

  return (
    <div className="relative min-h-screen flex md:flex-row flex-col bg-[#f1f5fa] lg:mt-0 mt-12">
      <PageHelmet
        title={`${user.name} (@${user.username}) | Xenly`}
        description={user.bio || `View ${user.name}'s profile on Xenly.`}
        image={user.profileImage?.url}
      />

      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-3 py-6 px-3 ">
        <UserProfileTop user={user} posts={myPosts} />

        <div className="mt-3">
          <PostFrom />
        </div>

        <div className="mt-3">
          <Posts
            posts={myPosts}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        </div>
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-screen md:sticky md:top-0 overflow-y-auto">
        <SideNavbar />

        <div className="w-full md:mt-2 mt-8 px-4 space-y-4">
          <ContactInfo user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
