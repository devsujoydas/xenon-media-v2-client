 
import { useLoaderData, useParams } from "react-router-dom"; 

import { useUserPosts } from "../../hooks/postHooks/usePosts";
import PostCard from "../../Components/PostCard/PostCard";
import ProfileSidebar from "../Profile/ProfileSidebar";
import UserProfileTop from "./UserProfileTop";
import ContactInfo from "../Profile/ContactInfo";
import PostFrom from "../Profile/PostFrom";

const CONTACT_LINKS = [
  { key: "website", label: "Website" },
  { key: "facebook", label: "Facebook" },
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter" },
  { key: "instagram", label: "Instagram" },
  { key: "youtube", label: "YouTube" },
];

const UserDetailsPage = () => {
  const { userId } = useParams();

  const { data } = useLoaderData();
  const AnotherUser = data.user;

  const { data: userPosts, isLoading } = useUserPosts(userId);

  return (
    <div className="min-h-screen  bg-[#f1f5fa] pb-16 flex md:flex-row flex-col">
      {/* Cover */}
      <div className=" md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-3 lg:px-5 px-3 space-y-5">
        <UserProfileTop user={AnotherUser} posts={userPosts} />

        <PostFrom />

        {/* Posts */}
        <div className=" mt-5">
         

          {isLoading && (
            <p className="text-[#5B6B65] text-sm">Loading posts...</p>
          )}

          {!isLoading && userPosts.length === 0 && (
            <p className="text-[#5B6B65] text-sm">no post found</p>
          )}

          {!isLoading && userPosts.length > 0 && (
            <div className="flex flex-col gap-4">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-screen md:sticky md:top-0 overflow-y-auto p-5">
        <ContactInfo user={AnotherUser} />
      </div>
    </div>
  );
};

export default UserDetailsPage;
