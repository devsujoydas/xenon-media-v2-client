import { useState } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

const UpdateProfileModal = ({
  showUpdateInfoModal,
  setShowUpdateInfoModal,
}) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleClose = () => setShowUpdateInfoModal(false);

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
      handleClose();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      Swal.fire("Update Failed!", message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ name, defaultValue, placeholder, label }) => (
    <div>
      {label && <label className="font-medium text-sm">{label}</label>}
      <div
        className={`relative ${label ? "mt-1" : ""} border focus-within:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center`}
      >
        <input
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className="w-full outline-none text-sm text-zinc-700 placeholder-zinc-400"
        />
      </div>
    </div>
  );

  if (!showUpdateInfoModal) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fadeIn"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={updateProfileHandler}
        className="relative bg-white w-full max-w-md sm:max-w-lg md:max-w-4xl rounded-2xl p-6 sm:p-8
                   space-y-6 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-1">
            Update Profile Info
          </h2>
          <p className="text-sm text-zinc-500">
            Keep your profile details up to date.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-500 mb-3">
            Profile Info
          </h3>
          <div className="grid gap-4">
            <InputField
              label="Name"
              name="name"
              defaultValue={user?.name}
              placeholder="Your full name"
            />
            <InputField
              label="Bio"
              name="bio"
              defaultValue={user?.bio}
              placeholder="Enter bio"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-500 mb-3">
            Contact Info
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="Phone"
              name="phone"
              defaultValue={user?.contactInfo?.phone}
              placeholder="Phone number"
            />
            <InputField
              label="Website"
              name="website"
              defaultValue={user?.contactInfo?.website}
              placeholder="Website URL"
            />
            <InputField
              label="Facebook"
              name="facebook"
              defaultValue={user?.contactInfo?.facebook}
              placeholder="Facebook URL"
            />
            <InputField
              label="Github"
              name="github"
              defaultValue={user?.contactInfo?.github}
              placeholder="Github URL"
            />
            <InputField
              label="LinkedIn"
              name="linkedin"
              defaultValue={user?.contactInfo?.linkedin}
              placeholder="LinkedIn URL"
            />
            <InputField
              label="Twitter / X"
              name="twitter"
              defaultValue={user?.contactInfo?.twitter}
              placeholder="Twitter / X URL"
            />
            <InputField
              label="Instagram"
              name="instagram"
              defaultValue={user?.contactInfo?.instagram}
              placeholder="Instagram URL"
            />
            <InputField
              label="YouTube"
              name="youtube"
              defaultValue={user?.contactInfo?.youtube}
              placeholder="YouTube URL"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-500 mb-3">
            Location
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              label="From"
              name="from"
              defaultValue={user?.location?.from}
              placeholder="Your hometown"
            />
            <InputField
              label="Lives in"
              name="livesIn"
              defaultValue={user?.location?.livesIn}
              placeholder="Current city"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-full transition flex items-center justify-center gap-2
    ${
      isLoading
        ? "bg-zinc-500 cursor-not-allowed text-white"
        : "bg-black hover:bg-zinc-700 text-white cursor-pointer"
    }`}
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileModal;