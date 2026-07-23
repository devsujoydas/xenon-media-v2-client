import { useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user, isFollowing, onFollowChange }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/users/${user._id}`)}
      className="bg-white border border-[#E1E5E1] rounded-2xl p-5 flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-[0_4px_20px_rgba(20,35,31,0.06)] hover:-translate-y-0.5 transition-all"
    >
      <img
        src={user.profileImage?.url || "/default_profile.webp"}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover border-2 border-[#F0EFE9]"
      />

      <div>
        <p className="font-serif text-lg font-semibold text-[#14231F] leading-tight">
          {user.name}
        </p>
        <p className="text-sm text-[#5B6B65]">@{user.username}</p>
      </div>

      <div className="flex gap-4 text-sm text-[#5B6B65]">
        <span>
          <strong className="text-[#14231F]">{user.followersCount ?? 0}</strong>{" "}
          Followers
        </span>
        <span>
          <strong className="text-[#14231F]">{user.followingCount ?? 0}</strong>{" "}
          Following
        </span>
      </div>

      <FollowButton
        userId={user._id}
        isFollowing={isFollowing}
        onChange={onFollowChange}
        size="sm"
      />
    </div>
  );
};

export default UserCard;