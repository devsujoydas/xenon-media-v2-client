import { Link } from "react-router-dom";

const PostContent = ({ post }) => (
  <div className="md:px-5 space-y-2">
    {post.content.text && (
      <p className="px-2 pt-2 text-sm font-semibold">{post.content.text}</p>
    )}
    {post.content.postImageUrl && (
      <Link to={`/post/${post._id}`}>
        <img
          src={post.content.postImageUrl}
          alt="Post"
          className="w-full object-cover rounded-lg md:h-[550px] h-56"
        />
      </Link>
    )}
  </div>
);

export default PostContent