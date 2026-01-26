import { useState } from "react";
import axios from "axios";

const ProfileImageUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);

    const handleChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return alert("Select a file first");
        const email = localStorage.getItem("email");
        if (!email) return alert("User not logged in");

        const formData = new FormData();
        formData.append("profileImage", file);
        formData.append("email", email);

        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/upload-profile`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            setImageUrl(res.data.imageUrl);
            alert("Upload success!");
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 space-y-4">
            <input type="file" accept="image/*" onChange={handleChange} />
            <button
                onClick={handleUpload}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Uploading..." : "Upload Profile Photo"}
            </button>
            {imageUrl && (
                <div className="mt-4">
                    <img src={imageUrl} alt="Profile" className="w-32 h-32 rounded-full" />
                    <p className="text-sm text-gray-600">{imageUrl}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileImageUpload;
