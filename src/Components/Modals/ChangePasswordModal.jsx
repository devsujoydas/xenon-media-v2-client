import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import api from "../../services/api";

const ERROR_MESSAGES = {
  ALL_FIELDS_REQUIRED: "Please fill in all fields",
  PASSWORD_MISMATCH: "New passwords do not match",
  PASSWORD_TOO_SHORT: "New password must be at least 8 characters",
  CURRENT_PASSWORD_INCORRECT: "Current password is incorrect",
  NEW_PASSWORD_MUST_BE_DIFFERENT:
    "New password must be different from your current password",
  USER_NOT_FOUND: "Something went wrong. Please log in again.",
};

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(true);
  const [showNew, setShowNew] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isOpen) return null;

  const resetLocalState = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setSuccess("");
  };

  const handleClose = () => {
    resetLocalState();
    onClose();
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError(ERROR_MESSAGES.ALL_FIELDS_REQUIRED);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError(ERROR_MESSAGES.PASSWORD_MISMATCH);
      return;
    }
    if (newPassword.length < 8) {
      setError(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
      return;
    }

    setLoading(true);

    api
      .put("/password/change-password", {
        currentPassword,
        newPassword,
        confirmNewPassword,
      })
      .then((res) => {
        setSuccess(res.data.message || "Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setTimeout(() => {
          handleClose();
        }, 1500);
      })
      .catch((err) => {
        const backendMsg = err.response?.data?.message;
        setError(
          ERROR_MESSAGES[backendMsg] ||
            backendMsg ||
            "Something went wrong. Try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4  animate-fadeIn"
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
          Change Password
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          Enter your current password and choose a new one.
        </p>

        <form onSubmit={changePasswordHandler} className="grid gap-4">
          {/* Current Password */}
          <div>
            <label className="font-medium text-sm">Current Password</label>
            <div className="relative mt-1 border focus-within:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
              <input
                type={showCurrent ? "password" : "text"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="Current Password"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute cursor-pointer right-4 text-zinc-500"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="font-medium text-sm">New Password</label>
            <div className="relative mt-1 border focus-within:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
              <input
                type={showNew ? "password" : "text"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute cursor-pointer right-4 text-zinc-500"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="font-medium text-sm">
              Confirm New Password
            </label>
            <div className="relative mt-1 border focus-within:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
              <input
                type={showConfirm ? "password" : "text"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="Confirm New Password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute cursor-pointer right-4 text-zinc-500"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
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
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;