import forgotPassImg from "/forgotpassword.jpg";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NavLogo from "../../Components/Navbar/NavLogo";
import { useState } from "react";
import api from "../../services/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    api
      .post("/password/request-reset", { email })
      .then((res) => {
        setMessage(res.data.message);
        setSent(true);
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
      <div className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 shadow-lg border border-zinc-100 p-4">
        {/* Image Section */}
        <div className="hidden xl:block">
          <img
            src={forgotPassImg}
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
                Forgot Password
              </h1>
              <p className="text-sm sm:text-base">
                We'll send a verification link to your email address
              </p>
            </div>

            {sent ? (
              <div className="mt-8 sm:mt-10">
                <div className="rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
                  {message}
                </div>
                <div className="mt-5 flex gap-1 justify-center items-center">
                  Back to
                  <Link to="/login" className="font-bold hover:underline">
                    Log In
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Form */}
                <form
                  onSubmit={forgotPasswordHandler}
                  className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 "
                >
                  {/* Email */}
                  <div>
                    <label className="font-medium text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600 -mt-2">{error}</p>
                  )}

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

                    {loading
                      ? "Sending Verification Link..."
                      : "Send Verification Link"}
                  </button>
                </form>

                <div className="mt-5 flex gap-1 justify-center items-center">
                  Back to
                  <Link to="/login" className="font-bold  hover:underline">
                    Log In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;