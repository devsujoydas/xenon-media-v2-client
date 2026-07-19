// PostDetails/PostDetails.jsx
import { useLoaderData } from "react-router-dom";
import PostCard from "../PostCard/PostCard";
import CommentBox from "./CommentBox";

const PostDetails = () => {
  const { data } = useLoaderData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 gap-5 md:h-screen bg-white md:p-0 p-3 md:ml-5 md:mt-0 mt-10">
      <div className="lg:col-span-6 mt-5">
        <PostCard post={data.post} variant="details" />
      </div>

      <div className="lg:col-span-3 h-full md:-ml-5 md:p-5">
        <div className="max-h-[95vh] h-full overflow-hidden w-full shadow-2xl rounded-md">
          <CommentBox post={data.post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
