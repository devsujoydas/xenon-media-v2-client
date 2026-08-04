// PostCard/ActionButtons.jsx
import { useState } from "react";
import { BiLike, BiSolidLike, BiCommentDots } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { PiShareFatBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  useIsPostSaved,
  useToggleSavePost,
} from "../../../hooks/postHooks/useSavedPosts";
import ShareModal from "../../Modals/ShareModal";

const ActionButtons = ({ reacted, reactCount, toggleReact, post }) => {
  const saved = useIsPostSaved(post._id);
  const { mutate: toggleSave, isPending } = useToggleSavePost();
  const [showShareModal, setShowShareModal] = useState(false); // ✅ নতুন state

  const postUrl = `${window.location.origin}/post/${post._id}`;

  return (
    <>
      <div className="flex justify-between items-center py-2 border-t px-2 border-gray-200">
        <div className="flex items-center w-full gap-5 md:justify-start md:gap-4">
          <button
            onClick={toggleReact}
            className={`flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg transition-all active:scale-95
              ${reacted ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-100"}
             cursor-pointer`}
          >
            {reacted ? (
              <BiSolidLike className="text-xl" />
            ) : (
              <BiLike className="text-xl" />
            )}
            <span className="flex items-center gap-1 text-sm font-medium">
              {reactCount}
              <span className="hidden md:inline">Like</span>
            </span>
          </button>

          <Link to={`/post/${post._id}`}>
            <button className="flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer">
              <BiCommentDots className="text-xl" />
              <span className="hidden md:inline text-sm font-medium">
                {" "}
                {post?.commentCount || 0} Comments
              </span>
            </button>
          </Link>

          {/* ✅ আগের copy handler এর বদলে এখন modal ওপেন করে */}
          <button
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1 md:gap-2 md:px-3 px-1.5 md:py-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
          >
            <PiShareFatBold className="text-xl" />
            <span className="hidden md:inline text-sm font-medium">Share</span>
          </button>
        </div>

        <div className="ml-2 cursor-pointer">
          {saved ? (
            <IoBookmark
              onClick={() => !isPending && toggleSave(post)}
              className="md:text-2xl text-blue-600 active:scale-95 transition-all"
            />
          ) : (
            <CiBookmark
              onClick={() => !isPending && toggleSave(post)}
              className="md:text-2xl text-gray-600 hover:text-blue-600 active:scale-95 transition-all"
            />
          )}
        </div>
      </div>

      {/* ✅ Modal এখানে render হচ্ছে */}
      <ShareModal
        isOpen={showShareModal}
        setIsOpen={setShowShareModal}
        url={postUrl}
        title={post?.content?.slice(0, 100) || "Check this post out"}
      />
    </>
  );
};

export default ActionButtons;
