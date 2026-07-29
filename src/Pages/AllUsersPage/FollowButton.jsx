import { useMemo, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useAuth } from "../../AuthProvider/AuthProviderNew";

const FollowButton = ({
  anotherUser,
  followersCount,
  setfollowersCount,
  sm,
}) => {
  const { user } = useAuth();

  // followers array theke sorasori check kora hocche, extra API call lagse na
  const initialIsFollowing = useMemo(() => {
    if (!anotherUser?.followers || !user?._id) return false;
    return anotherUser.followers.some(
      (followerId) =>
        String(followerId?._id ?? followerId) === String(user._id),
    );
  }, [anotherUser?.followers, user?._id]);

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [actionLoading, setActionLoading] = useState(false);
  const [hovering, setHovering] = useState(false);

  const size = sm ? "py-1.5 px-6 text-sm" : "py-2 px-8 ";

  const handleClick = async (e) => {
    e.stopPropagation();
    if (actionLoading) return;

    setActionLoading(true);
    const previous = isFollowing;
    setIsFollowing(!previous);

    try {
      const { data: body } = await api.patch(
        `/follow/users/${anotherUser._id}/follow`,
      );

      if (body.data.isFollowing) {
        setfollowersCount(followersCount + 1);
      } else {
        setfollowersCount(followersCount - 1);
      }

      setIsFollowing(!!body?.data?.isFollowing);
      toast.success(body?.message);
    } catch (err) {
      setIsFollowing(previous); // revert on failure
      console.error("Failed to toggle follow", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  };

  if (isFollowing) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        disabled={actionLoading}
        className={`${size} w-full cursor-pointer rounded-full font-medium transition-colors border disabled:opacity-60 ${
          hovering
            ? "bg-[#FDEDE6] border-[#C1502E] text-[#C1502E]"
            : "bg-white border-[#D8DEDA] text-[#14231F]"
        }`}
      >
        {actionLoading ? "..." : hovering ? "Unfollow" : "Following"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={actionLoading}
      className={`${size} cursor-pointer w-full rounded-full font-medium bg-[#3835fd] text-white hover:bg-[#6f6dfd] transition-colors disabled:opacity-60`}
    >
      {actionLoading ? "..." : "Follow"}
    </button>
  );
};

export default FollowButton;