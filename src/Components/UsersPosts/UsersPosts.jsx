import { useMyPosts } from "../../hooks/useMyPosts";
import PostCard from "../PostCard/PostCard";
// import { useAuth } from "../../hooks/useAuth";
import PostSkeleton from "../Posts/PostSkeleton";

const UsersPosts = () => {
  const {
    data: myPosts,
    isLoading,
    isFetching,
  } = useMyPosts();

  console.log(myPosts)

  const skeletons = Array.from({ length: 1 });

  // 1️⃣ Loading state → Skeleton
  if (isLoading || isFetching) {
    return (
      <div className="grid md:gap-5 gap-3">
        {skeletons.map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    );
  }

  // 2️⃣ Empty state
  if (!myPosts || myPosts.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <h1 className="text-zinc-400 text-lg">No posts found...</h1>
      </div>
    );
  }

  // 3️⃣ Success state
  return (
    <div className="grid md:gap-5 gap-2">
      {myPosts.map((post) => (
        <PostCard key={post._id} post={post} variant="feed" />
      ))}
    </div>
  );
};

export default UsersPosts;
