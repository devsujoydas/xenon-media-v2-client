import { useLoaderData, useNavigate } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import axios from "axios";

const PostDetailsUpdate = () => {
  const post = useLoaderData();
  const navigate = useNavigate();

  const { content } = post || {};
  const postImageUrl = content?.postImageUrl || "";
  const postText = content?.text || "";

  const swalWithTailwind = Swal.mixin({
    customClass: {
      confirmButton:
        "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-semibold py-2 px-4 rounded",
      cancelButton:
        "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer text-white font-semibold py-2 px-4 rounded",
    },
    buttonsStyling: false,
  });

  const handlePostDetailsUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedText = form.postContent.value.trim();

    if (!updatedText) {
      Swal.fire("Warning", "Please write something to update!", "warning");
      return;
    }

    const updatedData = {
      postContent: updatedText,
      postImageUrl,
      lastUpdateDate: new Date(),
    };

    try {
      const confirm = await swalWithTailwind.fire({
        title: "Are you sure?",
        text: "You want to update this post?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (!confirm.isConfirmed) {
        return swalWithTailwind.fire({
          title: "Cancelled",
          text: "Your post remains unchanged.",
          icon: "info",
        });
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/post/update/${post._id}`,
        updatedData
      );

      await swalWithTailwind.fire({
        title: "Updated!",
        text: "Post has been updated successfully.",
        icon: "success",
      });

      navigate(-1);
    } catch (error) {
      console.error("Post update failed:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  return (
    <div className="md:mt-10 min-h-[90vh] mt-24 md:mx-10 mx-5 flex justify-center gap-6 md:flex-row flex-col">
      {/* Post Preview */}
      <div className="w-full space-y-5">
        <div className="rounded-lg overflow-hidden border border-zinc-200 shadow-sm">
          <img
            src={postImageUrl}
            alt="Post"
            className="hover:scale-105 active:scale-110 duration-500 transition-transform cursor-zoom-in w-full object-cover"
          />
        </div>
        <p className="text-lg text-zinc-700">{postText}</p>
      </div>

      {/* Update Form */}
      <div className="w-full">
        <form
          onSubmit={handlePostDetailsUpdate}
          className="space-y-6 border border-zinc-200 shadow-md bg-white md:p-10 p-5 rounded-lg"
        >
          <h1 className="font-semibold text-3xl text-center text-blue-700  ">
            Edit Post
          </h1>

          <div className="flex flex-col gap-3">
            <label className="font-medium text-zinc-700">Post Image URL</label>
            <input
              name="postImageUrl"
              value={postImageUrl}
              disabled
              type="text"
              className="outline-none p-3 bg-zinc-100 border border-zinc-300 rounded-md cursor-not-allowed text-zinc-500"
            />

            <label className="font-medium text-zinc-700">Post Content</label>
            <textarea
              name="postContent"
              defaultValue={postText}
              required
              rows="3"
              autoFocus
              className="outline-none p-3 bg-white border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="border border-zinc-400 text-xl p-3 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200"
            >
              <FaRegSmile />
            </button>

            <button
              type="button"
              className="border border-zinc-400 text-2xl p-2 rounded-full cursor-pointer active:scale-95 transition-all hover:bg-zinc-200"
            >
              <IoMicOutline />
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-3 rounded-full cursor-pointer active:scale-95 transition-all"
            >
              <span>Update</span>
              <VscSend className="text-2xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostDetailsUpdate;
