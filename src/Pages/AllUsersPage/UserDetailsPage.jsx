import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { getCurrentUserId } from "../../hooks/userHooks/Currentuser";

import FollowButton from "./FollowButton";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import { useUserPosts } from "../../hooks/postHooks/usePosts";
import PostCard from "../../Components/PostCard/PostCard";
import ProfileSidebar from "../Profile/ProfileSidebar";
import UserProfileTop from "./UserProfileTop";

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
  const { user } = useAuth();

  const { data } = useLoaderData();

  const currentUserId = getCurrentUserId();

  const [AnotherUser, setAnotherUser] = useState(data.user);

  const [followState, setFollowState] = useState({
    isFollowing: false,
    followersCount: 0,
  });

  const { data: userPosts, isLoading, error } = useUserPosts(userId);

  const [postSearch, setPostSearch] = useState(""); 
  const isOwnProfile = String(currentUserId) === String(userId);
  const activeContactLinks = CONTACT_LINKS.filter(
    (c) => AnotherUser.contactInfo?.[c.key],
  );

  return (
    <div className="min-h-screen bg-[#F6F7F5] pb-16">
      {/* Cover */}
      <div className="max-w-4xl mx-auto">


        <UserProfileTop user={AnotherUser} posts={userPosts}/>
        {/* Profile header */}
        <div className="px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between  mt-16">
            <div className="flex items-end gap-4">
              <img
                src={AnotherUser.profileImage?.url}
                alt={AnotherUser.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-[#F6F7F5] bg-white"
              />
              <div className="pb-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#14231F]">
                  {AnotherUser.name}
                </h1>
                <p className="text-[#5B6B65]">@{AnotherUser.username}</p>
              </div>
            </div>

            {!isOwnProfile && (
              <div className="mt-4 sm:mt-0 sm:pb-3">
                <FollowButton
                  userId={AnotherUser._id}
                  isFollowing={followState.isFollowing}
                  onChange={(next) =>
                    setFollowState((prev) => ({
                      isFollowing: next,
                      followersCount: prev.followersCount + (next ? 1 : -1),
                    }))
                  }
                />
              </div>
            )}
          </div>

          {AnotherUser.bio && (
            <p className="mt-4 text-[#14231F] leading-relaxed max-w-2xl">
              {AnotherUser.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-[#5B6B65]">
            <span>
              <strong className="text-[#14231F]">
                {followState.followersCount}
              </strong>{" "}
              Followers
            </span>
            <span>
              <strong className="text-[#14231F]">
                {AnotherUser.following?.length || 0}
              </strong>{" "}
              Following
            </span>
            {AnotherUser.location?.livesIn && (
              <span>📍 Lives in {AnotherUser.location.livesIn}</span>
            )}
            {AnotherUser.location?.from && (
              <span>🏠 From {AnotherUser.location.from}</span>
            )}
          </div>

          {activeContactLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {activeContactLinks.map((c) => (
                <a
                  key={c.key}
                  href={user.contactInfo[c.key]}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-1.5 rounded-full border border-[#E1E5E1] bg-white text-[#1F6F5C] hover:border-[#1F6F5C] transition-colors"
                >
                  {c.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="px-6 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-[#14231F]">
              Posts
            </h2>
            <input
              type="text"
              value={postSearch}
              onChange={(e) => setPostSearch(e.target.value)}
              placeholder="Search this user's posts..."
              className="bg-white border border-[#E1E5E1] rounded-full px-4 py-2 text-sm text-[#14231F] placeholder:text-[#9AA6A0] focus:outline-none focus:ring-2 focus:ring-[#1F6F5C]/30 focus:border-[#1F6F5C] w-64"
            />
          </div>

          {isLoading && (
            <p className="text-[#5B6B65] text-sm">Loading posts...</p>
          )}

          {!isLoading && userPosts.length === 0 && (
            <p className="text-[#5B6B65] text-sm">Ekhono kono post nai.</p>
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
    </div>
  );
};

export default UserDetailsPage;
