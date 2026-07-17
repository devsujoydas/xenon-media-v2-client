import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedLayout from "../Layout/AnimatedLayout.jsx";
import Home from "../Pages/Home/Home.jsx";
import Profile from "../Pages/Profile/Profile.jsx";
import AuthPrivateRoutes from "./AuthPrivateRoutes.jsx";
import Login from "../Pages/Authentication/Login.jsx";
import Signup from "../Pages/Authentication/Signup.jsx";
import ForgotPassword from "../Pages/Authentication/ForgotPassword.jsx";
import ResetPassword from "../Pages/Authentication/ResetPassword.jsx";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <AnimatedLayout>
                            <Home />
                        </AnimatedLayout>
                    }
                    
                />
                <Route
                    path="/profile"
                    element={
                        <AnimatedLayout>
                            <Profile />
                        </AnimatedLayout>
                    }
                />


                <Route
                    path="/login"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <Login />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <Signup />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <ForgotPassword />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <ResetPassword />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
