import { useState } from "react";
import { followUser, unfollowUser } from "../../hooks/userHooks/followUser";
 
const FollowButton = ({ userId, isFollowing, onChange, size = "md" }) => {
  const [loading, setLoading] = useState(false);
  const [hovering, setHovering] = useState(false);

  const sizeClasses =
    size === "sm" ? "text-xs px-3 py-1.5" : "text-sm px-4 py-2";

  const handleClick = async (e) => {
    e.stopPropagation();
    if (loading) return;

    setLoading(true);
    const next = !isFollowing;
    onChange?.(next); // optimistic update

    try {
      if (isFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    } catch (err) {
      onChange?.(isFollowing); // revert on failure
      console.error("Follow action failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isFollowing) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        disabled={loading}
        className={`${sizeClasses} w-full cursor-pointer rounded-full font-medium transition-colors border disabled:opacity-60  ${
          hovering
            ? "bg-[#FDEDE6] border-[#C1502E] text-[#C1502E]"
            : "bg-white border-[#D8DEDA] text-[#14231F]"
        }`}
      >
        {loading ? "..." : hovering ? "Unfollow" : "Following"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${sizeClasses} cursor-pointer w-full rounded-full font-medium bg-[#3835fd] text-white hover:bg-[#6f6dfd] transition-colors disabled:opacity-60`}
    >
      {loading ? "..." : "Follow"}
    </button>
  );
};

export default FollowButton;