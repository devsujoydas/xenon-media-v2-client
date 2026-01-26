import { useState } from "react";
import axios from "axios";

const CommentSection = ({ post, setPost }) => {
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    if (!commentText) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}/comment`, {
        text: commentText
      }, { withCredentials: true });

      setPost(res.data);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="space-y-2">
        {post.comments.map((c) => (
          <div key={c._id} className="border-b border-gray-200 py-1 flex items-center gap-2">
            <img src={c.user.profilePhotoUrl || "/default-avatar.png"} className="w-6 h-6 rounded-full" />
            <p className="text-sm"><strong>{c.user.username}</strong>: {c.text}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-md px-2 py-1"
        />
        <button onClick={addComment} className="bg-blue-600 text-white px-3 py-1 rounded-md">
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
