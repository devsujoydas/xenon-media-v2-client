import { Link, useLoaderData } from 'react-router-dom';
import AllFriends from './AllFriends';
import { LuMessageCircleMore } from "react-icons/lu";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserAltSlash } from "react-icons/fa";
import PostCard from '../../Components/PostCard/PostCard.jsx';
import { useAuth } from '../../AuthProvider/AuthProviderNew.jsx';


const FriendDetails = () => {
  

    const data = useLoaderData();
  

    const btnStyle =
        "block md:px-6 px-2 py-2 md:text-sm text-xs font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all";

   

    return (
        <div className="md:pt-0 pt-3 min-h-screen">

            <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
                {/* Left Side */}
                <div className="lg:col-span-6 p-3 md:p-5 flex flex-col">

                    {/* Friend Details */}
                    <div className="mb-5 flex-1 overflow-y-auto">
                        <div
                            className="md:h-96 h-40 rounded-lg border border-zinc-300 md:mt-0 mt-14 bg-no-repeat bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${friend?.coverImage?.url ||
                                    "/default-cover.jpg"
                                    })`,
                            }}
                        >

                        </div>

                        <div className="flex md:gap-5 items-center ">
                            <div className="md:ml-10 ml-2">
                                <div
                                    className="md:w-50 w-28 md:h-50 h-28 outline outline-zinc-300 bg-white  border-4 border-white md:-mt-24 -mt-14 rounded-full bg-no-repeat bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${friend?.profile?.profilePhotoUrl || "/default.jpg"})`,
                                    }}
                                ></div>
                            </div>

                            <div className="flex md:items-center flex-col md:flex-row md:gap-5 flex-1">
                                <div className="md:mt-3 md:ml-0 ml-2 flex-grow">
                                    <h1 className="md:text-2xl text-xl font-semibold">
                                        {friend?.name}
                                    </h1>
                                    <h1 className="md:text-md text-sm text-gray-600">
                                        @{friend?.username}
                                    </h1>
                                </div>

                                {/* Dynamic Buttons */}
                                <div className="md:mt-4 mt-2 flex justify-center md:items-center md:-ml-0 -ml-2 flex-wrap gap-2 w-full md:w-auto">
                                    <div>
                                        {isFriend && (
                                            <button
                                                onClick={unfriendHandler}
                                                className={`${btnStyle} bg-red-100 text-red-600 font-semibold`}
                                            >
                                                <FaUserAltSlash className="md:text-lg text-sm inline-block mr-1" />
                                                Unfriend
                                            </button>
                                        )}

                                        {!isFriend && hasReceivedRequest && (
                                            <button
                                                onClick={confirmFriendHandler}
                                                className={`${btnStyle} bg-green-100 text-green-700 font-semibold`}
                                            >
                                                ✅ Confirm
                                            </button>
                                        )}

                                        {!isFriend && hasSentRequest && (
                                            <button
                                                onClick={cancelRequestHandler}
                                                className={`${btnStyle} bg-yellow-100 text-yellow-700 font-semibold`}
                                            >
                                                ❌ Cancel
                                            </button>
                                        )}

                                        {!isFriend && !hasSentRequest && !hasReceivedRequest && isInYouMayKnow && (
                                            <button
                                                onClick={addFriendHandler}
                                                className={`${btnStyle} bg-blue-600 text-white font-semibold-1`}
                                            >
                                                <FaUserPlus className="md:text-lg text-sm inline-block" /> Add Friend
                                            </button>
                                        )}
                                    </div>

                                    <div>
                                        <Link
                                            to={`/message/${friend?._id}`}
                                            className={`${btnStyle} bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center md:gap-2 gap-1`}
                                        >
                                            <LuMessageCircleMore className="md:text-lg text-sm" /> Message
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex justify-center items-center flex-col md:mt-4 mt-3">
                            <div className="flex justify-center items-center md:gap-10 gap-3 text-sm md:text-xl">
                                <div className="text-center">
                                    <h1 className=" font-semibold">{friend?.posts?.length}</h1>
                                    <h1 className="font-medium text-zinc-500">Post</h1>
                                </div>
                                <div className="text-center border-zinc-300 border-r-2 border-l-2 md:px-8 px-3">
                                    <h1 className=" font-semibold">{friend?.myFriends.length}</h1>
                                    <h1 className="font-medium text-zinc-500">Followers</h1>
                                </div>
                                <div className="text-center">
                                    <h1 className=" font-semibold">0</h1>
                                    <h1 className="font-medium text-zinc-500">Following</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Friend Posts */}
                    <div className="">
                        {friendPost?.length === 0 ? (
                            <div className="flex justify-center items-center">
                                <h1 className="text-zinc-400">No post found...</h1>
                            </div>
                        ) : (
                            <div className="grid gap-5">
                                {friendPost.map((post) => (
                                    <PostCard key={post._id} post={post} friend={friend} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-3 md:p-5 p-3">
                    <h1 className="text-lg mb-5 font-semibold">People you may know</h1>
                    <div className="grid grid-cols-1 gap-2">
                        {youMayKnowFriends?.map((friendItem, idx) => (
                            <AllFriends key={idx} friend={friendItem} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendDetails;
