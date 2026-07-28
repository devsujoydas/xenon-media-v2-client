import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const FollowButton = ({ user,  }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [hovering, setHovering] = useState(false);
 
 
  useEffect(() => {
    let ignore = false;

    const loadStatus = async () => {
      setStatusLoading(true);
      try {
        const { data: body } = await api.get(
          `/follow/users/${user._id}/follow-status`,
        );
        if (!ignore) setIsFollowing(!!body?.data?.isFollowing);
      } catch (err) {
        console.error("Failed to fetch follow status", err);
      } finally {
        if (!ignore) setStatusLoading(false);
      }
    };

    if (user?._id) loadStatus();

    return () => {
      ignore = true;
    };
  }, [user?._id]);

  const handleClick = async (e) => {
    e.stopPropagation();
    if (actionLoading || statusLoading) return;

    setActionLoading(true);
    const previous = isFollowing;
    setIsFollowing(!previous); // optimistic update

    try {
      const { data: body } = await api.patch(
        `/follow/users/${user._id}/follow`,
      );
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

  if (statusLoading) {
    return (
      <button
        disabled
        className={`py-2 px-8 w-full rounded-full font-medium border border-[#D8DEDA] bg-white text-[#14231F] opacity-60`}
      >
        ...
      </button>
    );
  }

  if (isFollowing) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        disabled={actionLoading}
        className={`py-2 px-8 w-full cursor-pointer rounded-full font-medium transition-colors border disabled:opacity-60 ${
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
      className={`py-2 px-8 cursor-pointer w-full rounded-full font-medium bg-[#3835fd] text-white hover:bg-[#6f6dfd] transition-colors disabled:opacity-60`}
    >
      {actionLoading ? "..." : "Follow"}
    </button>
  );
};

export default FollowButton;
