// PostDetails/PostDetails.jsx
import { useLoaderData, useParams } from "react-router-dom";
import CommentBox from "./CommentBox";
import PostCard from "../PostCard/PostCard";
import PageHelmet from "../../PageHelmet/PageHelmet";
import { useEffect, useState } from "react"; 
import api from "../../../services/api";
import PostSkeleton from "./PostSkeleton";

const PostDetails = () => {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    api
      .get(`/posts/post/${params.id}`)
      .then((res) => res.data)
      .then((data) => setPost(data.post))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="relative min-h-screen flex md:flex-row flex-col bg-[#f1f5fa] lg:mt-0 mt-12">
      <PageHelmet
        title={post?.author?.name ? `${post.author.name}'s Post | Xenly` : "Post Details | Xenly"}
        description={post?.content?.slice(0, 160) || "View this post on Xenly."}
        image={post?.postImg?.url}
        type="article"
      />

      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-6 lg:px-5 px-3 ">
        {loading || !post ? (
          <PostSkeleton />
        ) : (
          <PostCard post={post} variant="details" />
        )}
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-80 md:h-screen md:sticky md:top-0 overflow-y-auto">
        <CommentBox post={post} />
      </div>
    </div>
  );
};

export default PostDetails;
