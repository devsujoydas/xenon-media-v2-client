import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ImAttachment } from "react-icons/im";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import useCreateComment from '../../hooks/useCreateComment';

const CommentForm = ({ post, user }) => {

    const [text, setText] = useState("");
    const { handleCreateComment } = useCreateComment(post._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleCreateComment(text);
        setText("");
    };


    return (
        <div className="pt-4 border-t mt-3">
            <div className="flex gap-3 items-start">
                <Link to="/profile">
                    <img
                        src={user?.profileImage?.url}
                        alt="profile"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
                    />
                </Link>

                <form onSubmit={(e) => handleSubmit(e)} className="flex-1">
                    <textarea
                        name='text'
                        rows="2"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your comment here...."
                        className="w-full resize-none rounded-xl border border-zinc-400 px-4 py-2 text-sm outline-none "
                    />

                    <div className="flex items-center justify-end mt-2">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
                                <ImAttachment />
                            </div>
                            <div className="p-2 md:p-3 border border-zinc-400 rounded-full cursor-pointer hover:bg-zinc-200">
                                <FaRegSmile />
                            </div>

                            <button
                                type="submit"
                                disabled={!text.trim()}
                                className="p-2 md:p-3 border border-blue-700 text-blue-700 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <VscSend />
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CommentForm