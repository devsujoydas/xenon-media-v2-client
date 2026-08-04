import React, { useRef, useState } from "react";
import signupPhoto from "/loginphoto.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, UserRound } from "lucide-react";
import SignInWithGoogle from "./SignInWithGoogle";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import NavLogo from "../../Components/Navbar/NavLogo";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";

const GUEST_EMAIL = "johndoe@gmail.com";
const GUEST_PASSWORD = "johndoe1234";

const Login = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const performLogin = (email, password, { isGuest = false } = {}) => {
    const setLoadingState = isGuest ? setGuestLoading : setLoading;
    setLoadingState(true);

    api
      .post("/auth/signin", { email, password })
      .then((res) => {
        queryClient.setQueryData(["profile"], res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);
        navigate("/profile");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const logInHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    performLogin(email, password);
  };

  const guestLoginHandler = () => {
    // Fill the visible inputs so the user sees the credentials populate
    if (emailRef.current) emailRef.current.value = GUEST_EMAIL;
    if (passwordRef.current) passwordRef.current.value = GUEST_PASSWORD;

    performLogin(GUEST_EMAIL, GUEST_PASSWORD, { isGuest: true });
  };

  return (
    <div className=" min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0">
      <PageHelmet
        title="Login | Xenly"
        description="Sign in to your Xenly account to continue."
      />

      <div className="w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 shadow-lg border border-zinc-100 p-4">
        {/* Image Section */}
        <div className="hidden xl:block">
          <img
            src={signupPhoto}
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
                Log In
              </h1>
              <p className="text-sm sm:text-base mt-3">
                Don't have an account?{" "}
                <Link to="/signup" className="font-bold hover:underline">
                  Create an Account
                </Link>
              </p>
            </div>

            {/* Guest Login */}
            <button
              type="button"
              onClick={guestLoginHandler}
              disabled={loading || guestLoading}
              className={`mt-6 w-full py-3 rounded-full border transition flex items-center justify-center gap-2 text-sm font-medium
    ${
      guestLoading
        ? "border-zinc-300 text-zinc-400 cursor-not-allowed"
        : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 cursor-pointer"
    }`}
            >
              {guestLoading ? (
                <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
              ) : (
                <UserRound size={18} />
              )}
              {guestLoading ? "Logging in as Guest..." : "Continue as Guest"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-sm text-zinc-400">or</span>
              <div className="flex-1 border-t"></div>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => logInHandler(e)}
              className="grid gap-4 sm:gap-5 "
            >
              {/* Email */}
              <div>
                <label className="font-medium text-sm">Email Address</label>
                <input
                  ref={emailRef}
                  name="email"
                  className="w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300"
                  placeholder="Email Address"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-sm">Password</label>
                <div className="relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
                  <input
                    ref={passwordRef}
                    name="password"
                    type={show ? "password" : "text"}
                    className="w-full outline-none"
                    required
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute cursor-pointer right-4 text-zinc-500"
                  >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center md:flex-row flex-col-reverse justify-between text-sm">
                <div className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    id="checkbox"
                    required
                    className="cursor-pointer w-4 h-4 accent-black"
                  />
                  <label htmlFor="checkbox" className="cursor-pointer">
                    I agree to the{" "}
                    <span className="font-bold hover:underline tracking-tighter">
                      Terms & Conditions
                    </span>
                  </label>
                </div>

                <div>
                  <Link
                    to={"/forgot-password"}
                    className="font-bold hover:underline tracking-tighter "
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || guestLoading}
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

                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Google */}
            {/* <SignInWithGoogle /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;