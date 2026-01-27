import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedLayout from "../Layout/AnimatedLayout.jsx";
import Home from "../Pages/Home/Home.jsx";
import Profile from "../Pages/Profile/Profile.jsx";
import AuthPrivateRoutes from "./AuthPrivateRoutes.jsx";
import LoginUpdated from "../Pages/Authentication/LoginUpdated.jsx";
import SignupUpdated from "../Pages/Authentication/SignupUpdated.jsx";
import ForgotPasswordUpdated from "../Pages/Authentication/ForgotPasswordUpdated.jsx";
import ResetPasswordUpdated from "../Pages/Authentication/ResetPasswordUpdated.jsx";

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
                                <LoginUpdated />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <SignupUpdated />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <ForgotPasswordUpdated />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <AuthPrivateRoutes>
                            <AnimatedLayout>
                                <ResetPasswordUpdated />
                            </AnimatedLayout>
                        </AuthPrivateRoutes>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
