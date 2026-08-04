import React, { useEffect, useState } from "react";
import resetpassimg from "/resetpassimg.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import NavLogo from "../../Components/Navbar/NavLogo";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";
import api from "../../services/api";

const ResetPassword = () => {
  const [showPass, setShowPass] = useState(true);
  const [showConfirm, setShowConfirm] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // token check state: "checking" | "valid" | "invalid"
  const [tokenStatus, setTokenStatus] = useState("checking");

  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      return;
    }

    api
      .get(`/password/verify-reset-token?token=${token}`)
      .then(() => setTokenStatus("valid"))
      .catch(() => setTokenStatus("invalid"));
  }, [token]);

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmNewPassword) {
      setError("Please fill in both fields");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    api
      .post(`/password/reset-password?token=${token}`, {
        newPassword,
        confirmNewPassword,
      })
      .then((res) => {
        setSuccess(res.data.message);
        setTimeout(() => navigate("/login"), 1800);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Something went wrong. Try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0">
      <PageHelmet
        title="Reset Password | Xenly"
        description="Choose a new password for your Xenly account."
      />
      <div className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 lg:shadow-lg lg:border border-zinc-100 p-4">
        {/* Image Section */}
        <div className="hidden xl:block">
          <img
            src={resetpassimg}
            alt="signup"
            className="h-full w-full object-cover rounded-xl"
          />
        </div>

        {/* Form Section */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-10 ">
          <div className="w-full">
            <div className="mb-10 flex gap-2 text-blue-600">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="cursor-pointer"
              >
                <ArrowLeft className="active:scale-95" />
              </button>
              <NavLogo />
            </div>

            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2">
                Reset Password
              </h1>
              <p className="text-sm sm:text-base mt-3">
                Your new password must be different from your previous
                passwords.
              </p>
            </div>

            {tokenStatus === "checking" && (
              <p className="mt-8 text-sm text-zinc-500">
                Verifying reset link...
              </p>
            )}

            {tokenStatus === "invalid" && (
              <div className="mt-8 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                This reset link is invalid or has expired. Please request a
                new one from the{" "}
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="underline font-medium"
                >
                  forgot password
                </button>{" "}
                page.
              </div>
            )}

            {tokenStatus === "valid" && !success && (
              <form
                onSubmit={resetPasswordHandler}
                className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 "
              >
                {/* Password */}
                <div>
                  <label className="font-medium text-sm">New Password</label>
                  <div className="relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
                    <input
                      type={showPass ? "password" : "text"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full outline-none"
                      placeholder="New Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute cursor-pointer right-4 text-zinc-500"
                    >
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="font-medium text-sm">
                    Confirm Password
                  </label>
                  <div className="relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
                    <input
                      type={showConfirm ? "password" : "text"}
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="w-full outline-none"
                      placeholder="Confirm Password"
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`mt-2 py-3 sm:py-4 rounded-full transition flex items-center justify-center gap-2
    ${
      loading
        ? "bg-zinc-500 cursor-not-allowed text-white"
        : "bg-black hover:bg-zinc-700 text-white cursor-pointer"
    }`}
                >
                  {loading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>
            )}

            {success && (
              <div className="mt-8 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
                {success} Redirecting to login...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;