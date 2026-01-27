import { motion } from "framer-motion";
import Navbar from "../Components/Navbar/Navbar";

const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
};

const AnimatedLayout = ({ children }) => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedLayout;
