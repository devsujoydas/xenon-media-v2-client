// PostCard/PostStats.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const PostStats = ({ post, reactCount }) => {
  const [showUsers, setShowUsers] = useState(false);
  const count = reactCount ?? post?.reactCount ?? 0;
  const reactors = post?.reacts || []; // populated User docs now, from fetchPosts

  const getDisplayNames = (limit) => {
    const names = reactors.map((u) => u.name);
    const othersCount = names.length - limit;
    const display = names.slice(0, limit).join(", ");
    return othersCount > 0 ? `${display} and ${othersCount} others` : display;
  };

  return (
    <div className="flex justify-between items-center mt-2 text-sm px-4 pb-2">
      <div className="flex items-center gap-1">
        {count > 0 && (
          <div
            className="flex items-center gap-1 cursor-pointer relative"
            onMouseEnter={() => setShowUsers(true)}
            onMouseLeave={() => setShowUsers(false)}
          >
            <img src="/like.png" alt="Like" className="w-4 h-4 md:w-5 md:h-5 rounded-full" />

            {showUsers && reactors.length > 0 && (
              <div className="absolute bottom-8 -left-7 md:-left-4 z-20 bg-black/70 text-white p-3 rounded-lg flex flex-col gap-1 shadow-lg min-w-max">
                {reactors.map((u) => (
                  <Link
                    key={u._id}
                    to={post?.author?._id === u._id ? "/profile" : `/profile/${u._id}`}
                    className="hover:underline w-full truncate md:text-[14px] text-xs"
                  >
                    {u.name}
                  </Link>
                ))}
              </div>
            )}

            <p className="text-zinc-600 md:block hidden md:text-[14px] text-xs">
              {getDisplayNames(2)}
            </p>
            <p className="text-zinc-600 block md:hidden md:text-[16px] text-[11px]">
              {getDisplayNames(1)}
            </p>
          </div>
        )}
      </div>

      <Link
        to={`/post/${post?._id}`}
        className="text-zinc-500 hover:underline text-[11px] md:text-sm"
      >
        {post?.commentCount || 0} Comments
      </Link>
    </div>
  );
};

export default PostStats;