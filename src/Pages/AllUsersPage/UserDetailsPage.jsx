import { useLoaderData, useParams } from "react-router-dom";

import { useUserPosts } from "../../hooks/postHooks/usePosts";

import UserProfileTop from "./UserProfileTop";
import ContactInfo from "../Profile/ContactInfo";
import PostFrom from "../Profile/PostFrom";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";
import { getCurrentUserId } from "../../hooks/userHooks/Currentuser";
import PostSkeleton from "../../Components/Posts/PostDetails/PostSkeleton";
import PostCard from "../../Components/Posts/PostCard/PostCard";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";
import api from "../../services/api";
import { useEffect, useState } from "react";
import UserProfileTopSkeleton from "./UserProfileTopSkeleton";
import ContactInfoSkeleton from "../Profile/ContactInfoSkeleton";

const UserDetailsPage = () => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!params.username) return;
    setIsUserLoading(true);
    api
      .get(`/users/profile/${params.username}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => {
        console.error("Failed to load user:", err);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, [params.username]);

  const { data: userPosts, isLoading: isPostsLoading } = useUserPosts(
    user?._id,
  );
  const currentUserId = getCurrentUserId();
  const isOwnProfile = Boolean(
    user?._id && String(currentUserId) === String(user._id),
  );

  return (
    <div className="relative min-h-screen flex md:flex-row flex-col bg-[#f1f5fa] lg:mt-0 mt-12">
      <PageHelmet
        title={
          user
            ? `${user.name || "User"} (@${user.username || ""}) | Xenly`
            : "User Profile | Xenly"
        }
        description={user?.bio || `View profile on Xenly.`}
        image={user?.profileImage?.url}
      />

      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-6 lg:px-5 px-3 space-y-5">
        {isUserLoading || !user ? (
          <UserProfileTopSkeleton />
        ) : (
          <UserProfileTop user={user} posts={userPosts} />
        )}

        {isOwnProfile && <PostFrom />}

        {/* Posts */}
        <div className="mt-5">
          {isPostsLoading && (
            <div>
              <PostSkeleton />
            </div>
          )}

          {!isPostsLoading && userPosts?.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#5B6B65] text-sm">no post found</p>
            </div>
          )}

          {!isPostsLoading && userPosts && userPosts.length > 0 && (
            <div className="flex flex-col gap-4">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-fit md:h-screen md:sticky md:top-0 overflow-y-auto">
        <SideNavbar />

        <div className="w-full mt-2 px-4 space-y-4">
          {user ? (
            <ContactInfo user={user} />
          ) : (
            <ContactInfoSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
