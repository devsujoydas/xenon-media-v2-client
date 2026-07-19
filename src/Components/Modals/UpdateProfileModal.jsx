import { useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import {
  FaUserAlt,
  FaPhoneAlt,
  FaGlobe,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

const UpdateProfileModal = ({
  showUpdateInfoModal,
  setShowUpdateInfoModal,
}) => {
  // NOTE: assumes useAuth exposes `user` + `setUser`.
  // If your AuthProvider actually exposes `userData` / `setUserData`,
  // rename below (or better, rename the provider to `user` everywhere for consistency).
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      name: e.target.name.value,
      bio: e.target.bio.value,
      contactInfo: {
        phone: e.target.phone.value,
        website: e.target.website.value,
        facebook: e.target.facebook.value,
        github: e.target.github.value,
        linkedin: e.target.linkedin.value,
        twitter: e.target.twitter.value,
        instagram: e.target.instagram.value,
        youtube: e.target.youtube.value,
      },
      location: {
        from: e.target.from.value,
        livesIn: e.target.livesIn.value,
      },
    };

    try {
      const res = await api.put("/users/profile", payload);
      queryClient.setQueryData(["profile"], res.data.user);
      Swal.fire("Profile updated successfully!", "", "success");
      setShowUpdateInfoModal(false);
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      Swal.fire("Update Failed!", message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon, name, defaultValue, placeholder }) => (
    <div
      className="flex items-center gap-3 rounded-xl px-4 py-3 
                    bg-white border border-gray-200 shadow-sm
                    focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100
                    transition"
    >
      <span className="text-gray-400">{icon}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />
    </div>
  );

  return (
    <div
      onClick={() => setShowUpdateInfoModal(false)}
      className={`fixed inset-0 flex justify-center items-center 
      backdrop-blur-sm bg-black/40 transition-all duration-300
      ${showUpdateInfoModal ? "z-40 opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={updateProfileHandler}
        className="relative bg-white w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[45%]
                   mx-4 sm:mx-6 rounded-2xl shadow-2xl 
                   p-4 sm:p-6 md:p-8 lg:p-10 
                   space-y-6 sm:space-y-8 transform transition-all duration-300 
                   scale-95 opacity-100 animate-fadeIn overflow-y-auto max-h-[90vh]"
      >
        <button
          type="button"
          onClick={() => setShowUpdateInfoModal(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 
                     hover:bg-gray-100 rounded-full p-2 transition"
        >
          <IoClose size={26} />
        </button>

        <h1 className="text-center text-2xl md:text-3xl font-semibold text-blue-600">
          Update Profile Info
        </h1>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Profile Info
          </h2>
          <div className="space-y-4">
            <InputField
              icon={<FaUserAlt className="text-blue-500" />}
              name="name"
              defaultValue={user?.name}
              placeholder="Your full name"
            />
            <InputField
              icon={<FaUserAlt />}
              name="bio"
              defaultValue={user?.bio}
              placeholder="Enter bio"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">
            Contact Info
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              icon={<FaPhoneAlt className="text-blue-500" />}
              name="phone"
              defaultValue={user?.contactInfo?.phone}
              placeholder="Phone number"
            />
            <InputField
              icon={<FaGlobe className="text-green-500" />}
              name="website"
              defaultValue={user?.contactInfo?.website}
              placeholder="Website URL"
            />
            <InputField
              icon={<FaFacebook className="text-blue-600" />}
              name="facebook"
              defaultValue={user?.contactInfo?.facebook}
              placeholder="Facebook URL"
            />
            <InputField
              icon={<FaGithub className="text-gray-800" />}
              name="github"
              defaultValue={user?.contactInfo?.github}
              placeholder="Github URL"
            />
            <InputField
              icon={<FaLinkedin className="text-blue-700" />}
              name="linkedin"
              defaultValue={user?.contactInfo?.linkedin}
              placeholder="LinkedIn URL"
            />
            <InputField
              icon={<FaTwitter className="text-sky-500" />}
              name="twitter"
              defaultValue={user?.contactInfo?.twitter}
              placeholder="Twitter / X URL"
            />
            <InputField
              icon={<FaInstagram className="text-pink-600" />}
              name="instagram"
              defaultValue={user?.contactInfo?.instagram}
              placeholder="Instagram URL"
            />
            <InputField
              icon={<FaYoutube className="text-red-600" />}
              name="youtube"
              defaultValue={user?.contactInfo?.youtube}
              placeholder="YouTube URL"
            />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">Location</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              icon={<FaMapMarkerAlt className="text-orange-500" />}
              name="from"
              defaultValue={user?.location?.from}
              placeholder="Your hometown"
            />
            <InputField
              icon={<FaCity className="text-purple-600" />}
              name="livesIn"
              defaultValue={user?.location?.livesIn}
              placeholder="Current city"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-lg text-white text-sm font-medium
                     bg-gradient-to-r from-blue-600 to-blue-500
                     hover:from-blue-700 hover:to-blue-600 
                     transition-all flex justify-center items-center gap-3
                     shadow-md hover:shadow-lg disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;
