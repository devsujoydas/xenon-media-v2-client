import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

export default function UploadPostModal({ isOpen, setIsOpen }) {
  const { user } = useAuth();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.postContent.value.trim();
    if (!text && !file) {
      Swal.fire({
        title: "Nothing to post 😅",
        text: "Please write something or upload an image.",
        icon: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", text);
      if (file) formData.append("image", file);

      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);

      if (res.data.post) {
        queryClient.setQueryData(["my-posts"], (old) => [
          res.data.post,
          ...(old || []),
        ]);
      }

      Swal.fire({
        title: "Post Successful 🎉",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsOpen(false);
      e.target.reset();
      setFile(null);
      setPreview(null);
    } catch (error) {
      const message = error.response?.data?.message || "Failed to create post";
      Swal.fire({ title: "Error!", text: message, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-[500px] max-w-[95%] relative flex flex-col overflow-hidden"
      >
        <div className="flex items-center gap-3 p-4 border-b border-zinc-200">
          <img
            src={user?.profileImage?.url || "/default_profile.webp"}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-gray-800">
            Create Post as {user?.name || "User"}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handlePostSubmit} className="flex flex-col flex-grow">
          <textarea
            name="postContent"
            placeholder={`What's on your mind, ${user?.name || "friend"}?`}
            className="w-full p-4 text-gray-700 resize-none min-h-[100px] focus:outline-none"
          ></textarea>

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-xl m-4 p-6 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto max-h-52 rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-2 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 16l5-5 4 4 8-8"
                  />
                </svg>
                <p>Drop your image here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports: PNG, JPG, JPEG, WEBP
                </p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-3 p-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm flex items-center gap-2 cursor-pointer"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
