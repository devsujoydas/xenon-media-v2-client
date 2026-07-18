// PostCard/CommentInput.jsx
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { Link } from "react-router-dom";
import { useState } from "react"; 
import { useCreateComment } from "../../hooks/postHooks/useComments";

const CommentInput = ({ user, post }) => {
  const [text, setText] = useState("");
  const { createComment, submitting } = useCreateComment(post._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;
    await createComment(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 md:p-4 flex justify-between items-center gap-2 md:gap-16">
      <div className="flex items-center gap-2 md:gap-3 w-full">
        <Link to="/profile" className="w-10 h-10 md:w-12 md:h-12 box-border shrink-0">
          <img
            src={user?.profileImage?.url || "/default-avatar.png"}
            alt={user?.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer box-border"
          />
        </Link>

        <input
          name="text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your comment..."
          className="md:w-full w-33 border border-zinc-400 outline-none text-xs md:text-sm py-2 md:py-3 px-2 md:px-4 rounded-full"
        />
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
          <ImAttachment />
        </div>
        <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
          <FaRegSmile />
        </div>
        <button
          type="submit"
          disabled={!text.trim() || submitting}
          className="p-2 md:p-3 border border-blue-700 text-blue-700 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-blue-700"
        >
          <VscSend />
        </button>
      </div>
    </form>
  );
};

export default CommentInput;