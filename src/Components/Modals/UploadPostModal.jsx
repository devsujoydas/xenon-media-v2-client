import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import api from "../../services/api";
// import { useAuth } from "../../hooks/useAuth"; 

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function UploadPostModal({ isOpen, setIsOpen }) {
  const { user, postsData, setPostsData, usersPostsData, setUsersPostsData } = useAuth();


  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) setIsOpen(false);
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
 
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };
 
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = "";
 
      if (file) {
        finalImageUrl = await uploadImage(file);
      } else if (url) {
        finalImageUrl = url;
      }

      const text = e.target.postContent.value.trim();
      if (!text && !finalImageUrl) {
        Swal.fire({
          title: "Nothing to post 😅",
          text: "Please write something or upload an image.",
          icon: "warning",
        });
        setLoading(false);
        return;
      }
 
      const postData = {
        authorId: user._id,
        content: {
          text,
          postImageUrl: finalImageUrl || null,
        },
        createdAt: new Date(),
        updatedAt: null,
        likes: [],
        comments: [],
        shares: [],
      };

      // Send to backend
      const res = await api.post(`/post`, postData);
 
      if (res.status === 409) {
        Swal.fire({
          title: "Duplicate Image ❌",
          text: "This Image URL was already taken. Try another one.",
          icon: "error",
        });
        return;
      }
 
      if (res.data?.result?.insertedId) {

        api.get(`/posts?authorId=${user._id}`)
        .then(res=>{setUsersPostsData(res.data)})

        api.get(`/posts`)
        .then(res=>{setPostsData(res.data)})


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
        setUrl("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      const errMsg = error.response?.data || "Failed to create post";
      Swal.fire({
        title: "Error!",
        text: errMsg,
        icon: "error",
      });
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
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-200">
          <img
            src={!user?.profile?.profilePhoto ? `/default.jpg` : `${user?.profile.profilePhoto}`}
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

        {/* Form */}
        <form onSubmit={handlePostSubmit} className="flex flex-col flex-grow">
          {/* Caption */}
          <textarea
            name="postContent"
            placeholder={`What's on your mind, ${user?.name || "friend"}?`}
            className="w-full p-4 text-gray-700 resize-none min-h-[100px] focus:outline-none"
          ></textarea>

          {/* Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-xl m-4 p-6 text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {preview ? (
              <div className="relative inline-block">
                <img src={preview} alt="preview" className="mx-auto max-h-52 rounded-lg" />
                <button
                  type="button"
                  onClick={() => {
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

          {/* Import from URL */}
          <div className="flex items-center gap-2 mx-4 mb-4">
            <input
              type="text"
              placeholder="Or paste image URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {url && (
              <button
                type="button"
                onClick={() => setUrl("")}
                className="text-red-500 text-lg"
              >
                ×
              </button>
            )}
          </div>

          {/* Footer */}
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
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin "></span>
              )}
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
