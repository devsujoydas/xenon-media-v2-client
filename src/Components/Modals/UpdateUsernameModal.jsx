import { useState } from "react";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import { useAuth } from "../../AuthProvider/AuthProviderNew";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

const UpdateUsernameModal = ({ showUsernameModal, setShowUsernameModal }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const queryClient = useQueryClient();

  if (!showUsernameModal) return null;

  const handleClose = () => {
    setError("");
    setSuccess("");
    setShowUsernameModal(false);
  };

  const updateUsernameHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const username = e.target.username.value.trim();

    if (!username) {
      setError("Username cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await api.put("/users/profile", { username });
      queryClient.setQueryData(["profile"], res.data.user);

      setSuccess("Username updated successfully");

      Swal.fire({
        title: "Username updated successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong. Try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-black cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold mb-1">
          Update Username
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Choose a new username for your account.
        </p>

        <form onSubmit={updateUsernameHandler} className="grid gap-4">
          {/* Username */}
          <div>
            <label className="font-medium text-sm">Username</label>
            <div className="relative mt-1 border focus-within:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
              <input
                type="text"
                name="username"
                defaultValue={user?.username}
                onFocus={() => setError("")}
                className="w-full outline-none"
                placeholder="Enter new username"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-3 rounded-full transition flex items-center justify-center gap-2
    ${
      loading
        ? "bg-zinc-500 cursor-not-allowed text-white"
        : "bg-black hover:bg-zinc-700 text-white cursor-pointer"
    }`}
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsernameModal;