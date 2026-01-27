import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import pagenotfoundimg from "../../../public/LottieAnimations/404 planet animation.json";

const PageNotFound = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-500">
      
      {/* Floating background circles */}
      <motion.div
        className="absolute w-72 h-72 bg-white rounded-full opacity-10 top-[-50px] left-[-50px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-white rounded-full opacity-5 bottom-[-100px] right-[-100px]"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lottie Animation with fade + slide */}
      <motion.div
        className="w-72 md:w-96 mb-6"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Lottie animationData={pagenotfoundimg} loop={true} />
      </motion.div>

      

      {/* Subtext */}
      <motion.p
        className="text-white/80 text-lg md:text-xl mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>

      {/* Go Home Button with hover/tap motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>

    </div>
  );
};

export default PageNotFound;
