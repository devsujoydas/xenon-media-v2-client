import PostCard from "../PostCard/PostCard"; 
// import { useAuth } from "../../hooks/useAuth";
import PostSkeleton from "../Posts/PostSkeleton";

const UsersPosts = () => {
  const {usersPostsData, deletePostHandler } = useAuth()

  const hasPosts = usersPostsData && usersPostsData.length > 0;
  const skeletons = Array.from({ length: 3 });

  if (usersPostsData.length === 0) {
    return (
      <div className="grid md:gap-5 gap-3">
        {skeletons.map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-2xl">

      
      {!hasPosts ? (
        <div className="flex justify-center items-center h-full text-zinc-400">
          <h1>No posts found...</h1>
        </div>
      ) : (
        <div className="grid md:gap-5 gap-3">
          {usersPostsData.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              variant="user"
              onDelete={deletePostHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersPosts;
