// PostCard/PostContent.jsx
import { Link } from "react-router-dom";

const PostContent = ({ post }) => (
  <div className="md:px-5 space-y-2">
    {post?.content && (
      <p className="px-2 pt-2 text-sm font-semibold whitespace-pre-wrap">
        {post.content}
      </p>
    )}
    {post?.postImg?.url && (
      <Link to={`/post/${post._id}`}>
        <img
          src={post.postImg.url}
          alt="Post"
          loading="lazy"
          className="w-full object-cover rounded-lg md:h-[550px] h-56"
        />
      </Link>
    )}
  </div>
);

export default PostContent;