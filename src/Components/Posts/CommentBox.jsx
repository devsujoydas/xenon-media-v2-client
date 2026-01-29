import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import api from "../../services/api";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import CommentForm from "./CommentForm"; 

const CommentBox = ({ post }) => {
    const [commentsData, setCommentsData] = useState({});
    const [sortType, setSortType] = useState("recent");
    const [loading, setLoading] = useState(false);
   

    const { user } = useAuth();

    useEffect(() => {
        if (!post?._id) return;

        const fetchComments = async () => {
            try {
                setLoading(true);
                const res = await api.get(
                    `/posts/${post._id}/comments?sort=${sortType}`
                );
                setCommentsData(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [post, sortType]);

 

console.log(commentsData)



    return (
        <div className="h-full flex flex-col bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 overflow-hidden">

         
            <div className="pb-3 border-b">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Comments</span>
                        <span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                            {commentsData?.totalComments || 0}
                        </span>
                    </div>

                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none"
                    >
                        <option value="recent">Most Recent</option>
                        <option value="relevant">Most Relevant</option>
                    </select>
                </div>
            </div>

           
            <div className="flex-1 overflow-y-auto mt-3 pr-2 scrollbar-hide flex flex-col gap-3">

                {loading && (
                    <p className="text-sm text-gray-400 text-center mt-10">
                        Loading comments...
                    </p>
                )}

                {!loading && commentsData?.comments?.length > 0 ? (
                    commentsData.comments.map((cmt) => (
                        <CommentCard key={cmt._id} post={post} comment={cmt} />
                    ))
                ) : (
                    !loading && (
                        <p className="text-sm text-gray-400 text-center mt-10">
                            No comments yet
                        </p>
                    )
                )}
            </div>

           
            <CommentForm
                post={post}
                user={user}
            />

        </div>
    );
};

export default CommentBox;
