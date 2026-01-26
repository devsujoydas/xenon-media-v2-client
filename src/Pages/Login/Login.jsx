import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SignInWithGoogle from "../../AuthProvider/SignInWithGoogle";
import Lottie from "lottie-react";
import loginAnimation from "../../../public/LottieAnimations/Login.json";
import toast from 'react-hot-toast';
import { useAuth } from "../../AuthProvider/AuthProviderNew"; 

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/profile";
    const { setUser, logInUser, setUserData, setLoading } = useAuth()

    const [show, setShow] = useState(false);
    const [loadingSpinner, setLoadingSpinner] = useState(true);
    const [userStatus, setUserStatus] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = async ({ email, password }) => {
        setLoadingSpinner(false);
        try {
            const result = await logInUser(email, password);
            if (result.user.email) {
                setUser(result.user);
                setUserData(result.user);
                navigate(from, { replace: true });
                toast.success("Login Successfully")
            }
        } catch (err) {
            setUserStatus(err.message);
            setLoading(false);
        } finally {
            setLoadingSpinner(true);
        }
    };



    return (
        <div className="  p-8 bg-white h-screen overflow-hidden ">
            <div className="">
                <Link to="/" className="text-3xl font-semibold   text-blue-600">Xenon Media</Link>
            </div>
            <div className="h-full flex justify-center items-center w-full mx-auto ">
                <div className="grid grid-cols-1 w-full xl:grid-cols-2">
                    <div className="">
                        <div className="h-full flex justify-center  items-center">
                            <div className="md:space-y-8 space-y-5 lg:w-2/4 w-full max-w-md">
                                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5 w-full max-w-md">
                                    <div>
                                        <h1 className="md:text-5xl text-4xl md:mb-3 mb-2 font-semibold">Login Now</h1>
                                        <p className="text-xs md:text-sm">Please fill your details to access your account.</p>
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
                                        <input type="email" placeholder="Enter email" {...register("email", { required: true })} className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                                    </div>

                                    {/* Password */}
                                    <div className="relative">
                                        <label className="text-slate-800 text-sm font-medium mb-1 block">Password</label>
                                        <input type={show ? "text" : "password"} placeholder="Enter password" {...register("password", { required: true })} className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" />
                                        <div onClick={() => setShow(!show)} className="text-xl absolute top-9 right-3 cursor-pointer active:scale-95 transition-all">
                                            {show ? <FaRegEye /> : <FaRegEyeSlash />}
                                        </div>
                                        {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
                                    </div>

                                    {/* Remember Me + Forgot Password */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-slate-300 rounded cursor-pointer" />
                                            <label htmlFor="remember-me" className="text-black font-semibold ml-3 text-sm cursor-pointer">Remember me</label>
                                        </div>
                                        <Link to="/forgotPass" className="text-violet-600 font-semibold text-sm hover:underline ml-1">Forgot Password?</Link>
                                    </div>

                                    {userStatus && <h1 className="text-sm text-red-500 text-center font-semibold">{userStatus}</h1>}

                                    {/* Submit */}
                                    <button type="submit" className={`text-white font-medium ${loadingSpinner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5`}>
                                        <p className={`${loadingSpinner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                                        <p className={`${loadingSpinner ? "block" : "hidden"}`}>Login</p>
                                    </button>
                                </form> 

                                <p className="text-slate-800 text-sm text-center">Don't have an account? <Link to="/signup" className="text-violet-600 font-semibold hover:underline ml-1">Signup</Link></p>
                            </div>
                        </div>
                    </div>

                    <div className="hidden xl:flex justify-center  items-center  ">
                        <Lottie animationData={loginAnimation} loop={true} className="w-5/6 h-5/6 " />
                    </div>
                </div>
            </div>
        </div>

    )
};


export default Login;
