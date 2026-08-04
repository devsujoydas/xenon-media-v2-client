import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCreateComment } from "../../../hooks/postHooks/useComments";
 

const CommentInput = ({ user, post }) => {
  const [text, setText] = useState("");
  const { createComment, submitting } = useCreateComment(post._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    const success = await createComment(text);
    if (success) setText(""); // fail korle text muche jabe na
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-4 flex items-center gap-2 md:gap-4">
      <Link to="/profile" className="w-10 h-10 md:w-12 md:h-12 shrink-0">
        <img
          src={user?.profileImage?.url || "/default-avatar.png"}
          alt={user?.name}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
      </Link>

      <input
        name="text"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment..."
        className="flex-1 border border-zinc-300 outline-none focus:border-indigo-500 text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 rounded-full transition-colors"
      />

      <button
        type="submit"
        disabled={!text.trim() || submitting}
        className="p-2 md:p-3 border border-indigo-600 text-indigo-600 rounded-full cursor-pointer hover:bg-indigo-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-indigo-600 transition-all"
      >
        <VscSend />
      </button>
    </form>
  );
};

export default CommentInput;