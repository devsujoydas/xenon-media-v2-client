import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PostContent = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const el = textRef.current;
      setShowButton(el.scrollHeight > el.clientHeight);
    }
  }, [post?.content]);

  return (
    <div className="md:px-5 space-y-2">
      {post?.content && (
        <div className="px-2 pt-2">
          <p
            ref={textRef}
            className={`text-sm font-semibold whitespace-pre-wrap ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {post.content}
          </p>

          {showButton && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm font-medium hover:font-bold text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {expanded ? "See less" : "See more"}
            </button>
          )}
        </div>
      )}

      {post?.postImg?.url && (
        <div className="border border-gray-100 rounded-lg md:px-0 px-2">
          <Link to={`/post/${post._id}`}>
            <img
              alt="Post"
              src={post.postImg.url}
              loading="lazy"
              className="w-full object-contain rounded-lg md:max-h-[550px] max-h-90"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostContent;