import { useState } from "react";
import AuthorInfo from "./AuthorInfo.jsx";
import PostContent from "./PostContent.jsx";
import PostStats from "./PostStats.jsx";
import ActionButtons from "./ActionButtons.jsx";
import CommentInput from "./CommentInput.jsx";

import { useAuth } from "../../../AuthProvider/AuthProviderNew.jsx";
import { useReactPost } from "../../../hooks/postHooks/usePostActions.js";

const PostCard = ({ post, variant = "feed", onRemove }) => {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const { reacted, reactCount, toggleReact } = useReactPost(post);

  const showQuickComment = variant !== "details";

  return (
    <div className="shadow-xl border-t border-t-zinc-300 md:w-full rounded-2xl md:rounded-3xl bg-white">
      <AuthorInfo
        post={post}
        user={user}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        variant={variant}
        onRemove={onRemove}
      />

      <hr className="text-zinc-300" />
      <PostContent post={post} />
      <PostStats post={post} reactCount={reactCount} />
      <hr className="text-zinc-300" />

      <ActionButtons
        reacted={reacted}
        reactCount={reactCount}
        toggleReact={toggleReact}
        post={post}
      />

      {showQuickComment && (
        <>
          <hr className="text-zinc-300" />
          <CommentInput post={post} user={user} />
        </>
      )}
    </div>
  );
};

export default PostCard;
