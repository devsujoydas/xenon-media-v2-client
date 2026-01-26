import axios from "axios";

const useImageUploader = async (imageFile) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }); 
    return res.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    return null;
  }
};

export default useImageUploader;
