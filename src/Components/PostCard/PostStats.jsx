import { Link } from "react-router-dom";

const PostStats = ({ reactorsUsers, showUsers, setShowUsers, post }) => {


    const getDisplayNames = () => {
        const names = reactorsUsers.map(u => u.name);
        const othersCount = names.length - 2;
        const display = names.slice(0, 2).join(", ");
        return othersCount > 0 ? `${display} and ${othersCount} others` : display;
    };
    const getDisplayNamesSm = () => {
        const names = reactorsUsers.map(u => u.name);
        const othersCount = names.length - 1;
        const display = names.slice(0, 1).join(", ");
        return othersCount > 0 ? `${display} and ${othersCount} others` : display;
    };

    return (
        <div className="flex justify-between items-center mt-2 text-sm px-4 pb-2">
            {/* Likes */}
            <div className="flex items-center gap-1">
                <img
                    src="/like.png"
                    alt="Like"
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                />

                {reactorsUsers.length > 0 && (
                    <div
                        className="flex gap-1 cursor-pointer relative"
                        onMouseEnter={() => setShowUsers(true)}
                        onClick={() => setShowUsers(!showUsers)}
                    >
                        {showUsers && (
                            <div onMouseLeave={()=>setShowUsers(!showUsers)} className="absolute bottom-8 -left-7 md:-left-4 z-20 bg-black/70 text-white p-3 rounded-lg flex flex-col space-y-1 shadow-lg min-w-max">
                                {reactorsUsers.map((user, idx) => (
                                    <Link
                                        key={idx}
                                        to={post?.author?._id == user?._id
                                            ? "/profile"
                                            : `/profile/${user?._id}`
                                        }
                                        className="hover:underline w-full truncate md:text-[14px] text-xs"
                                    >

                                        {user.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <p className="text-zinc-600 md:block hidden md:text-[14px] text-xs">{getDisplayNames()}</p>
                        <p className="text-zinc-600 block md:hidden md:text-[16px] text-[11px]">{getDisplayNamesSm()}</p>
                    </div>
                )}
            </div>

            {/* Comments & Shares */}
            <div className="flex items-center gap-1 md:gap-3 text-[11px] md:text-sm">
                <div>{post.comments.length} Comments</div>
                <div>{post.shares.length} Shares</div>
            </div>
        </div>
    );
};

export default PostStats;
