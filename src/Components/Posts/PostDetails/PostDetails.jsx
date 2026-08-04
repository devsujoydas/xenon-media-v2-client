// PostDetails/PostDetails.jsx
import { useLoaderData } from "react-router-dom";
import CommentBox from "./CommentBox";
import PostCard from "../PostCard/PostCard";
import PageHelmet from "../../PageHelmet/PageHelmet";

const PostDetails = () => {
  const { data } = useLoaderData();

  return (
    <div className="relative min-h-screen flex md:flex-row flex-col bg-[#f1f5fa] lg:mt-0 mt-12">
      <PageHelmet
        title={`${data.post.author.name}'s Post | Xenly`}
        description={
          data.post.content?.slice(0, 160) || "View this post on Xenly."
        }
        image={data.post.postImg?.url}
        type="article"
      />

      <div className="md:w-4/5 overflow-y-auto scroll-smooth md:py-5 py-6 lg:px-5 px-3 ">
        <PostCard post={data.post} variant="details" />
      </div>

      <div className="md:w-2/5 border-l border-zinc-300 bg-white h-80 md:h-screen  md:sticky md:top-0 overflow-y-auto">
        <CommentBox post={data.post} />
      </div>
    </div>
  );
};

export default PostDetails;
