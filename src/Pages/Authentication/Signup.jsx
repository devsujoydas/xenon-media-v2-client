import React, { useState } from "react";
import signupPhoto from "/signupbg.png";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import SignInWithGoogle from "./SignInWithGoogle";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import NavLogo from "../../Components/Navbar/NavLogo";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";

const Signup = () => {
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signUpHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const fName = e.target.firstname.value;
    const lName = e.target.lastname.value;
    const name = `${fName} ${lName}`;
    const email = e.target.email.value;
    const password = e.target.password.value;

    api
      .post("/auth/signup", { name, email, password })
      .then((res) => {
        queryClient.setQueryData(["profile"], res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message);

        navigate("/profile"); // অথবা যেখানে নিতে চাও
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0">
      <PageHelmet
        title="Create Account | Xenly"
        description="Create your Xenly account and join the community today."
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
        <div className="px-4 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 ">
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
                Create an Account
              </h1>
              <p className="text-sm sm:text-base">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline">
                  Log In
                </Link>
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => signUpHandler(e)}
              className="mt-8 sm:mt-10 grid gap-4 sm:gap-5"
            >
              {/* Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-sm">First Name</label>
                  <input
                    name="firstname"
                    required
                    className="w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300"
                    placeholder="First Name"
                  />
                </div>

                <div>
                  <label className="font-medium text-sm">Last Name</label>
                  <input
                    name="lastname"
                    required
                    className="w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="font-medium text-sm">Email Address</label>
                <input
                  name="email"
                  required
                  className="w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300"
                  placeholder="Email Address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-sm">Password</label>
                <div className="relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center">
                  <input
                    name="password"
                    required
                    type={show ? "password" : "text"}
                    className="w-full outline-none"
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
              <div className="flex items-center gap-2 text-sm">
                <input
                  required
                  type="checkbox"
                  id="checkbox"
                  className="cursor-pointer w-4 h-4 accent-black"
                />
                <label htmlFor="checkbox" className="cursor-pointer">
                  I agree to the{" "}
                  <span className="font-semibold hover:underline  tracking-tighter">
                    Terms & Conditions
                  </span>
                </label>
              </div>

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

                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider
            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>
              <span className="px-4 text-sm text-zinc-400">or</span>
              <div className="flex-1 border-t"></div>
            </div> */}

            {/* Google */}
            {/* <SignInWithGoogle /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
