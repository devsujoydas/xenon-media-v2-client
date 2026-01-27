import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../services/api";

const useDeleteComment = () => {
    const queryClient = useQueryClient();

    const handleDeleteComment = async (commentId, postId) => {
        try {
            await api.delete(`/posts/${postId}/comments/${commentId}`);

            toast.success("Comment deleted");
            queryClient.invalidateQueries(["comments", postId]);
        } catch (err) {
            console.log(err)
            toast.error("Delete failed");
        }
    };

    return { handleDeleteComment };
};

export default useDeleteComment;
