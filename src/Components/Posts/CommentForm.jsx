// PostDetails/CommentForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { VscSend } from "react-icons/vsc"; 
import { useCreateComment } from "../../hooks/postHooks/useComments";

const CommentForm = ({ post, user, onCreated }) => {
  const [text, setText] = useState("");
  const { createComment, submitting } = useCreateComment(post._id, (newComment) => {
    onCreated?.(newComment);
    setText("");
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    await createComment(text);
  };

  return (
    <form onSubmit={handleSubmit} className="pt-3 border-t mt-3 flex items-center gap-2">
      <Link to="/profile" className="shrink-0">
        <img
          src={user?.profileImage?.url || "/default-avatar.png"}
          alt={user?.name}
          className="w-8 h-8 rounded-full object-cover"
        />
      </Link>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 border border-zinc-300 rounded-full text-sm px-3 py-2 outline-none"
      />

      <button
        type="submit"
        disabled={!text.trim() || submitting}
        className="p-2 border border-blue-700 text-blue-700 rounded-full hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <VscSend />
      </button>
    </form>
  );
};

export default CommentForm;