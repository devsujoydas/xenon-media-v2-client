import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../services/api";

const useCreateComment = (postId) => {
    const queryClient = useQueryClient();

    const handleCreateComment = async (text) => {
        if (!text.trim()) return;
        try {
            await api.post(`/posts/${postId}/comment`, { text });

            toast.success("Comment added");
            queryClient.invalidateQueries(["comments", postId]);
        } catch (err) {
            console.log(err)
            toast.error("Failed to add comment");
        }
    };

    return { handleCreateComment };
};

export default useCreateComment;
