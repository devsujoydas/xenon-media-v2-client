import { Link } from "react-router-dom";
 
import { useSavedPosts } from "../../hooks/postHooks/useSavedPosts";
import PostCard from "../../Components/Posts/PostCard/PostCard";


const SavedPostItem = ({ post }) => (
  <Link
    to={`/post/${post._id}`}
    className="flex gap-3 items-center p-2 border border-zinc-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300"
  >
    <img
      src={post?.postImg?.url}
      alt={post.content}
      className="w-20 h-16 object-cover rounded-md flex-shrink-0"
    />
    <h1 className="text-sm font-medium line-clamp-2 text-zinc-700">
      {post.content}
    </h1>
  </Link>
);

const EmptyState = ({ message }) => (
  <div className="flex-1 flex justify-center items-center h-full text-zinc-400">
    <h1>{message}</h1>
  </div>
);

const SavedPosts = () => {
  const { data: savedPosts, isLoading } = useSavedPosts();

  const posts = savedPosts?.posts ?? [];
  const hasPosts = posts.length > 0;

  return (
    <div className="bg-[#f1f5fa] min-h-screen grid grid-cols-1 lg:grid-cols-9">
      {/* Left: Saved Posts Feed */}
      <div className="lg:col-span-6 flex flex-col h-screen">
        <div className="md:sticky top-0 z-10 bg-[#f1f5fa] px-5 py-4">
          <h1 className="md:text-2xl text-xl font-semibold text-blue-600">
            Saved Posts
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 scroll-smooth">
          {isLoading ? (
            <EmptyState message="Loading saved posts..." />
          ) : hasPosts ? (
            <div className="grid md:gap-5 gap-3">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} variant="saved" />
              ))}
            </div>
          ) : (
            <EmptyState message="No saved posts found..." />
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <aside className="lg:col-span-3 bg-white border-l border-zinc-200 flex flex-col h-screen sticky top-0 p-5">
        <h1 className="font-semibold text-blue-500 text-lg mb-4">
          Saved Posts List
        </h1>

        {isLoading ? (
          <EmptyState message="Loading..." />
        ) : hasPosts ? (
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {posts.map((post) => (
              <SavedPostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState message="No saved posts yet" />
        )}
      </aside>
    </div>
  );
};

export default SavedPosts;