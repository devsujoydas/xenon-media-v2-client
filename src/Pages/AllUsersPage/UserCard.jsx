import { Link, useNavigate } from "react-router-dom";
import FollowButton from "./FollowButton";

const UserCard = ({ user, isFollowing, onFollowChange }) => {
  console.log(user);

  return (
    <div className="border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex ">
      <div className="md:p-0 p-2 ">
        <Link to={`/users/${user._id}`}>
          <img
            className="md:w-full w-24 md:h-52 h-22 object-cover scale md:rounded-none rounded-full"
            src={`${user?.profileImage.url}`}
            alt=""
          />
        </Link>
      </div>
      <div className="md:p-3 p-2 md:w-full w-3/4 relative">
        <div className="flex flex-col justify-between h-full ">
          <div className="flex flex-col gap-2">
            <Link to={`/users/${user._id}`}>
              <h1 className="text-[16px] flex items-center gap-2 text-wrap font-semibold">
                {user.name}
                <span>
                  {user.activeStatus.online ? (
                    <p className="bg-green-400 h-3.5 w-3.5 rounded-full  border border-white"></p>
                  ) : (
                    <p className="bg-gray-400 h-3.5 w-3.5 rounded-full  border border-white"></p>
                  )}
                </span>
              </h1>
            </Link>
            <h1 className="md:text-sm text-xs -mt-2">@ {user.username}</h1>
          </div>

          <div className="flex gap-4 mt-2 text-sm text-[#5B6B65]">
            <span>
              <strong className="text-[#14231F]">
                {user.followersCount ?? 0}
              </strong>{" "}
              Followers
            </span>
            <span>
              <strong className="text-[#14231F]">
                {user.followingCount ?? 0}
              </strong>{" "}
              Following
            </span>
          </div>
          
          <div className="mt-2 w-full">


          <FollowButton
            userId={user._id}
            isFollowing={isFollowing}
            onChange={onFollowChange}
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
