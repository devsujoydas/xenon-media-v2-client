import { useMyPosts } from "../../hooks/postHooks/useMyPosts";
import PostCard from "../PostCard/PostCard";
import PostSkeleton from "../Posts/PostSkeleton";

const UsersPosts = ({ myPosts, isLoading, isFetching }) => {



  const skeletons = Array.from({ length: 1 });

  if (isLoading || isFetching) {
    return (
      <div className="grid md:gap-5 gap-3">
        {skeletons.map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (!myPosts || myPosts.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <h1 className="text-zinc-400 text-lg">No posts found...</h1>
      </div>
    );
  }

  return (
    <div className="grid md:gap-5 gap-2">
      {myPosts.map((post) => (
        <PostCard key={post._id} post={post} variant="feed" />
      ))}
    </div>
  );
};

export default UsersPosts;
