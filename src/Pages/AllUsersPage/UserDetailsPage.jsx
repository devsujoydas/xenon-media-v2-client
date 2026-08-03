import { useLoaderData } from "react-router-dom";

import { useUserPosts } from "../../hooks/postHooks/usePosts";
import PostCard from "../../Components/PostCard/PostCard";
import UserProfileTop from "./UserProfileTop";
import ContactInfo from "../Profile/ContactInfo";
import PostFrom from "../Profile/PostFrom";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";
import { getCurrentUserId } from "../../hooks/userHooks/Currentuser";

const UserDetailsPage = () => {
  const { data } = useLoaderData();
  const AnotherUser = data.user;
  const { data: userPosts, isLoading } = useUserPosts(AnotherUser._id);
  const currentUserId = getCurrentUserId();
  const isOwnProfile = String(currentUserId) === String(AnotherUser._id);

  return (
    <div className="mrelative min-h-screen flex md:flex-row flex-col bg-[#f1f5fa] lg:mt-0 mt-12">
      {/* Cover */}
      <div className=" md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-6 lg:px-5 px-3 space-y-5">
        <UserProfileTop user={AnotherUser} posts={userPosts} />

        {isOwnProfile && <PostFrom />}

        {/* Posts */}
        <div className=" mt-5">
          {isLoading && (
            <p className="text-[#5B6B65] text-sm">Loading posts...</p>
          )}

          {!isLoading && userPosts?.length === 0 && (
            <p className="text-[#5B6B65] text-sm">no post found</p>
          )}

          {!isLoading && userPosts?.length > 0 && (
            <div className="flex flex-col gap-4">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-screen md:sticky md:top-0 overflow-y-auto">
        <SideNavbar />

        <div className="w-full mt-8 px-4 space-y-4">
          <ContactInfo user={AnotherUser} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
