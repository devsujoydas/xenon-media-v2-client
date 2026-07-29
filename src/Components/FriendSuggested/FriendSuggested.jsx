import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import FriendSuggestedSkeleton from "./FriendSuggestedSkeleton";
import { useUsers } from "../../hooks/userHooks/useUsers";
import { useEffect, useState } from "react";
import FollowButton from "../../Pages/AllUsersPage/FollowButton";
import { CloudLightning } from "lucide-react";

const FriendCard = ({ user }) => {
  const [followersCount, setfollowersCount] = useState(
    user?.followers?.length || 0,
  );

  return (
    <div>
      <hr className="text-zinc-300 my-3 md:my-5" />
      <div className="flex justify-between items-center">
        <Link
          to={`/profile/${user?.username}`}
          className="flex w-full justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="active:scale-95 transition-all cursor-pointer">
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={user?.profileImage?.url}
                alt=""
              />
            </div>
            <div>
              <h1 className="font-semibold active:underline transition-all cursor-pointer">
                {user?.name}
              </h1>
              <p className="text-zinc-500 text-sm">@{user?.username}</p>
            </div>
          </div>
        </Link>
        <div className="mt-2 ">
          <FollowButton
            followersCount={followersCount}
            setfollowersCount={setfollowersCount}
            anotherUser={user}
            sm={true}
          />
        </div>
      </div>
    </div>
  );
};

const FriendSuggested = () => {
  const skeletons = Array.from({ length: 3 });

  const { data, isLoading } = useUsers();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-semibold">Friends Suggested</h1>
        <Link
          to="/users"
          className="flex items-center text-sm md:text-lg gap-1 text-blue-600 hover:text-black font-semibold"
        >
          See All <MdOutlineArrowOutward className="md:text-2xl" />
        </Link>
      </div>

      {data?.users?.length == 0 ? (
        <div className="grid md:gap-5 gap-3 my-5">
          {skeletons.map((_, idx) => (
            <FriendSuggestedSkeleton key={idx} />
          ))}
          <hr className="text-zinc-300 " />
        </div>
      ) : (
        <div>
          {data?.users.map((user, idx) => (
            <FriendCard user={user} key={idx} />
          ))}
          <hr className="text-zinc-300 my-3 md:my-5" />
        </div>
      )}
    </div>
  );
};

export default FriendSuggested;
