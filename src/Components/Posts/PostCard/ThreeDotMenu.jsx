import { useState } from "react";
import { MdEdit, MdVisibilityOff } from "react-icons/md";
import { FaCopy, FaBookmark, FaFlag } from "react-icons/fa";
import { FaRegTrashCan, FaCircleMinus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuth } from "../../../AuthProvider/AuthProviderNew";
import {
  useIsPostSaved,
  useToggleSavePost,
} from "../../../hooks/postHooks/useSavedPosts";
import { useDeletePost } from "../../../hooks/postHooks/usePostActions";
import UpdatePostModal from "../../Modals/UpdatePostModal";

const ThreeDotMenu = ({ post, variant = "feed", onRemove, setShowMenu }) => {
  const { user } = useAuth();
  const saved = useIsPostSaved(post._id);
  const { mutate: toggleSave, isPending: savePending } = useToggleSavePost();
  const { deletePost, deleting } = useDeletePost();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const isAuthor = user?._id === post?.author?._id;

  const menuItemStyle =
    "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs md:text-sm transition-all hover:bg-zinc-100 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const destructiveStyle = "text-red-600 hover:bg-red-50";

  const sharePostHandler = () => {
    const url = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Post URL copied!"))
      .catch(() => toast.error("Couldn't copy the link"));
    setShowMenu(false);
  };

  const handleSaveToggle = () => {
    if (!savePending) toggleSave(post);
    setShowMenu(false);
  };

  const handleDeleteConfirmed = async () => {
    const success = await deletePost(post._id);
    if (success) {
      onRemove?.(post._id);
      toast.success("Post deleted successfully");
    } else {
      toast.error("Failed to delete post");
    }
    setShowMenu(false);
  };

  const editPostHandler = () => {
    setShowUpdateModal(true);
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="absolute top-10 right-0 w-40 md:w-56 bg-white border border-zinc-200 shadow-xl rounded-xl p-2 z-20 animate-in fade-in zoom-in-95 duration-150"
        onMouseLeave={() => setShowMenu(false)}
      >
        <button onClick={sharePostHandler} className={menuItemStyle}>
          <FaCopy className="text-zinc-600" /> Copy URL
        </button>

        {isAuthor ? (
          <>
            <button onClick={editPostHandler} className={menuItemStyle}>
              <MdEdit className="text-zinc-600" /> Edit Post
            </button>

            <button onClick={handleSaveToggle} className={menuItemStyle}>
              <FaBookmark
                className={saved ? "text-indigo-600" : "text-zinc-600"}
              />
              {saved ? "Remove Saved" : "Save Post"}
            </button>

            <hr className="my-2 border-zinc-200" />

            {!confirmingDelete ? (
              <button
                onClick={() => setConfirmingDelete(true)}
                className={`${menuItemStyle} ${destructiveStyle}`}
              >
                <FaRegTrashCan /> Delete Post
              </button>
            ) : (
              <div className="px-3 py-2 space-y-2 bg-red-50 rounded-lg">
                <p className="text-xs text-zinc-600">
                  Delete this post permanently?
                </p>
                <div className="flex gap-3">
                  <button
                    disabled={deleting}
                    onClick={handleDeleteConfirmed}
                    className="text-xs text-red-600 font-semibold disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Yes, delete"}
                  </button>
                  <button
                    onClick={() => setConfirmingDelete(false)}
                    className="text-xs text-zinc-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button onClick={handleSaveToggle} className={menuItemStyle}>
              <FaBookmark
                className={saved ? "text-indigo-600" : "text-zinc-600"}
              />
              {saved ? "Remove Saved" : "Save Post"}
            </button>

            <hr className="my-2 border-zinc-200" />

            <button
              className={menuItemStyle}
              onClick={() => setShowMenu(false)}
            >
              <FaCircleMinus className="text-zinc-600" /> Not Interested
            </button>
            <button
              className={menuItemStyle}
              onClick={() => setShowMenu(false)}
            >
              <MdVisibilityOff className="text-zinc-600" /> Hide Post
            </button>
            <button
              className={`${menuItemStyle} ${destructiveStyle}`}
              onClick={() => setShowMenu(false)}
            >
              <FaFlag /> Report Post
            </button>
          </>
        )}
      </div>

      {/* ✅ Modal component টা এখানে render হচ্ছে */}
      <UpdatePostModal
        isOpen={showUpdateModal}
        setIsOpen={setShowUpdateModal}
        post={post}
      />
    </>
  );
};

export default ThreeDotMenu;
