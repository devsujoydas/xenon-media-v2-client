import PostCard from "./PostCard/PostCard";
import PostSkeleton from "./PostDetails/PostSkeleton";

const Posts = ({ posts, isLoading, isFetching }) => {
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

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <h1 className="text-zinc-400 text-lg">No posts found...</h1>
      </div>
    );
  }

  // 3️⃣ Success state
  return (
    <div className="grid md:gap-3 gap-2 ">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} variant="feed" />
      ))}
    </div>
  );
};

export default Posts;
