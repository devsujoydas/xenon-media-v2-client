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
      <div className="border border-gray-200 rounded-lg md:px-0 px-2">
        <Link to={`/post/${post._id}`} className="">
          <img
            src={post.postImg.url}
            alt="Post"
            loading="lazy"
            className="w-full object-cover rounded-lg md:h-[550px] h-90"
          />
        </Link>
      </div>
    )}
  </div>
);

export default PostContent;
