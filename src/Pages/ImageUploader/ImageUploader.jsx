import React, { useState } from "react";
import useImageUploader from "../../hooks/useImageUploader";

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

    const handleUpload = async () => {
        if (!file) return alert("Please select an image");
        const imageUrl = await useImageUploader(file);
        if (imageUrl) {
            alert("Uploaded: " + imageUrl); 
        }
    };

    return (
        <div className="flex flex-col gap-10 justify-center items-center h-screen ">
            {/* Preview Box */}
            <div className="">
                <p className="mb-2 text-center">Preview</p>
                <div className="border border-zinc-700 p-3 rounded-xl shadow-lg">
                    {previewImg ? (
                        <img
                            src={previewImg}
                            className="w-40 rounded-md border border-zinc-600"
                            alt="Preview"
                        />
                    ) : (
                        <div className="w-96 h-64 flex items-center justify-center text-zinc-500">
                            No image selected
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Section */}
            <div className="flex flex-col gap-4 items-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        setFile(selectedFile);
                        setPreviewImg(URL.createObjectURL(selectedFile));
                    }}
                    className="text-sm file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-600 file:text-white
            hover:file:bg-pink-700
            cursor-pointer"
                />

                <button
                    onClick={handleUpload}
                    className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 
            text-white rounded-full shadow-md hover:scale-105 
            transition-transform duration-300"
                >
                    Upload Image
                </button>
            </div>
        </div >
    );
};

export default ImageUploader;
