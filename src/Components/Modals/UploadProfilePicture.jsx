import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import api from "../../services/api";

export default function UploadProfilePicture({
  isOpen,
  setIsOpen,
  type = "profile",
}) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        handleClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setFile(null);
    setPreview(null);
  };

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

  const handleUpload = async () => {
    if (!file) {
      Swal.fire("Please select an image first", "", "warning");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const endpoint =
        type === "cover"
          ? "/users/profile/cover-photo"
          : "/users/profile/profile-photo";

      const res = await api.put(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      queryClient.setQueryData(["profile"], res.data.user);
      
      if (res.data.post) {
        queryClient.setQueryData(["my-posts"], (old) => [
          res.data.post,
          ...(old || []),
        ]);
      }

      Swal.fire({
        title:
          type === "cover" ? "Cover photo updated!" : "Profile photo updated!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      handleClose();
    } catch (error) {
      const message = error.response?.data?.message || "Failed to upload image";
      Swal.fire("Upload Failed", message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/40 flex justify-center items-center animate-fadeIn">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-xl w-[450px] max-w-[95%] relative flex flex-col overflow-hidden"
      >
        <div className="flex items-center gap-3 p-4 border-b border-zinc-200">
          <h2 className="font-medium text-gray-800">
            Update {type === "cover" ? "Cover" : "Profile"} Photo
          </h2>
          <button
            onClick={handleClose}
            className="ml-auto text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-xl m-4 p-6 text-center cursor-pointer hover:bg-gray-50 transition"
          onClick={() => document.getElementById("photoInput").click()}
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
              <p>Drop your image here, or click to browse</p>
              <p className="text-xs text-gray-400 mt-1">
                Supports: PNG, JPG, JPEG, WEBP
              </p>
            </div>
          )}
          <input
            type="file"
            id="photoInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-zinc-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-sm flex items-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
