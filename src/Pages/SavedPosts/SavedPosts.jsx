import { Link } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";
// import { useAuth } from "../../hooks/useAuth";

const SavedPostItem = ({ post }) => (
  <Link
    to={`/post/${post._id}`}
    className="flex gap-3 items-center p-2 border border-zinc-200 rounded-lg hover:shadow-md hover:border-blue-400 transition-all duration-300"
  >
    <img
      src={post?.content?.postImageUrl || post?.postImageUrl}
      alt={post?.content?.text || "Post"}
      className="w-20 h-16 object-cover rounded-md flex-shrink-0"
    />
    <h1 className="text-sm font-medium line-clamp-2 text-zinc-700">
      {post?.content?.text || "No Content"}
    </h1>
  </Link>
);

const SavedPosts = () => {
  const { savedPosts, removeSavedPostHandler } = useAuth()
  const hasSavedPosts = savedPosts && savedPosts.length > 0;

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
          {!hasSavedPosts ? (
            <div className="flex justify-center items-center h-full text-zinc-400">
              <h1>No saved posts found...</h1>
            </div>
          ) : (
            <div className="grid md:gap-5 gap-3">
              {savedPosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  variant="saved"
                  onRemove={removeSavedPostHandler}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Sidebar */}
      <aside className="lg:col-span-3 bg-white border-l border-zinc-200 flex flex-col h-screen sticky top-0 p-5">
        <h1 className="font-semibold text-blue-500 text-lg mb-4">
          Saved Posts List
        </h1>

        {!hasSavedPosts ? (
          <div className="flex-1 flex justify-center items-center text-zinc-400">
            <h1>No saved posts yet</h1>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-1 space-y-2">
            {savedPosts.map((post) => (
              <SavedPostItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </aside>
    </div>
  );
};

export default SavedPosts;
