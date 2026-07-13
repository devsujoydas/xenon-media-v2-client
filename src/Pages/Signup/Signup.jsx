import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import Lottie from "lottie-react";
import registerAnimation from "../../../public/LottieAnimations/register.json";
import toast from 'react-hot-toast';
import { useAuth } from "../../AuthProvider/AuthProviderNew";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import auth from "../../Firebase/firebase.config";
import api from "../../services/api";


const Signup = () => {
    const navigate = useNavigate();
    const { signUpUser, setUser, setUserData } = useAuth()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userStatus, setUserStatus] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };



    const validate = () => {
        const errs = {};
        if (!formData.email) errs.email = "Email is required";
        else if (!/^\S+@\S+$/.test(formData.email)) errs.email = "Invalid email address";

        if (!formData.password) errs.password = "Password is required";
        else if (formData.password.length < 6) errs.password = "Password must be at least 6 characters";

        if (!formData.confirmPassword) errs.confirmPassword = "Please confirm your password";
        else if (formData.password !== formData.confirmPassword)
            errs.confirmPassword = "Passwords do not match";

        return errs;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setUserStatus("");
        setIsLoading(true);

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }


        try {
            const result = await signUpUser(formData.email, formData.password);
            setUser(result.user);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, { email: formData.email })
            setUserData(res.data.user);
            toast.success("Account Create Successfully")
            navigate("/profile");
        } catch (err) {
            setUserStatus(err.message || "Signup failed. Try again.");
        } finally {
            setIsLoading(false);
        }
    };



    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const firebaseToken = await result.user.getIdToken();

        await api.post("/auth/google", { firebaseToken });
    };



    return (
        <div className="bg-white min-h-screen overflow-hidden grid grid-cols-1 xl:grid-cols-2  ">
            {/* Left side */}
            <div className="p-8">
                <Link
                    to="/"
                    className="text-3xl font-semibold   text-blue-600"
                >
                    Xenly
                </Link>

                <div className="h-full flex justify-center items-center lg:w-2/4 w-full mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
                        <div className="space-y-3">
                            <h1 className="md:text-5xl text-4xl md:mb-3 mb-2 font-semibold">
                                Signup Now
                            </h1>
                            <p className="text-sm text-gray-600">
                                Please fill your details to create an account.
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-slate-800 text-sm font-medium mb-1 block">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label className="text-slate-800 text-sm font-medium mb-1 block">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-10 right-3 cursor-pointer"
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                            {errors.password && (
                                <p className="text-red-600 text-sm">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label className="text-slate-800 text-sm font-medium mb-1 block">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                            />
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute top-10 right-3 cursor-pointer"
                            >
                                {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                            {errors.confirmPassword && (
                                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                id="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        {/* Error Message */}
                        {userStatus && <p className="text-red-600 text-sm">{userStatus}</p>}

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded w-full flex justify-center"
                        >
                            {isLoading ? (
                                <span className="w-6 h-6 border-2 border-white border-t-blue-500 animate-spin rounded-full"></span>
                            ) : (
                                "Signup"
                            )}
                        </button>

                        <p className="text-center text-sm text-gray-800">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-violet-600 font-semibold hover:underline ml-1"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            {/* Right side */}
            <div className="hidden xl:flex justify-center items-center ">
                <Lottie animationData={registerAnimation} loop={true} className="w-3/4 h-3/4 " />
            </div>
        </div>
    );
};

export default Signup;
