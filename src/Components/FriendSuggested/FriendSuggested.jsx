import { IoMdAdd } from "react-icons/io";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom"; 
import FriendSuggestedSkeleton from "./FriendSuggestedSkeleton";
import { useAuth } from "../../AuthProvider/AuthProviderNew";


const FriendSuggested = () => {
  const { youMayKnowFriends } = useAuth() 
  const skeletons = Array.from({ length: 3 });

  return (

    <div>
      <div className="flex justify-between items-center">
        <h1 className="md:text-xl font-semibold">Friends Suggested</h1>
        <Link to="/friends" className="flex items-center text-sm md:text-lg gap-1 text-blue-600 hover:text-black font-semibold">See All <MdOutlineArrowOutward className="md:text-2xl" /></Link>
      </div>

      {youMayKnowFriends?.length == 0
        ? 
        <div className="grid md:gap-5 gap-3 my-5">
          {skeletons.map((_, idx) => (
            <FriendSuggestedSkeleton key={idx} />
          ))}
          <hr className="text-zinc-300 " />
        </div>
        :
        <div>
          {/* {
            youMayKnowFriends[0] &&
            <div>
              <hr className="text-zinc-300 my-3 md:my-5" />
              <Link to={`/profile/${youMayKnowFriends[0]?._id}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={!youMayKnowFriends[0]?.profile?.profilePhotoUrl ? `/default.jpg` : `${youMayKnowFriends[0]?.profile?.profilePhotoUrl}`} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[0]?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{youMayKnowFriends[0]?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-3 md:my-5" />
            </div>
          }

          {
            youMayKnowFriends[1] &&
            <div>
              <Link to={`/profile/${youMayKnowFriends[1]?._id}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={!youMayKnowFriends[1]?.profile?.profilePhotoUrl ? `/default.jpg` : `${youMayKnowFriends[1]?.profile?.profilePhotoUrl}`} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[1]?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{youMayKnowFriends[1]?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-3 md:my-5" />
            </div>
          }

          {
            youMayKnowFriends[2] &&
            <div>
              <Link to={`/profile/${youMayKnowFriends[2]?._id}`} className="flex w-full justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="active:scale-95 transition-all cursor-pointer">
                    <img className="w-10 h-10 object-cover rounded-full" src={!youMayKnowFriends[2]?.profile?.profilePhotoUrl ? `/default.jpg` : `${youMayKnowFriends[2]?.profile?.profilePhotoUrl}`} alt="" />
                  </div>
                  <div>
                    <h1 className="font-semibold active:underline transition-all cursor-pointer">{youMayKnowFriends[2]?.name}</h1>
                    <p className="text-zinc-500 text-sm">@{youMayKnowFriends[2]?.username}</p>
                  </div>
                </div>
                <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
              </Link>
              <hr className="text-zinc-300 my-3 md:my-5" />
            </div>
          } */}
        </div>
      }
    </div>
  )
}

export default FriendSuggested