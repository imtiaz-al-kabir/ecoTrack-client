import { motion } from "motion/react";
import { Link } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-emerald-100 to-teal-200 text-center px-4">
      {/* Animated number */}
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-[120px] md:text-[160px] font-extrabold text-emerald-600 drop-shadow-lg"
      >
        404
      </motion.h1>

      {/* Animated message */}
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-2xl md:text-3xl font-semibold text-gray-800"
      >
        Oops! Page Not Found 😕
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 text-gray-600 max-w-md"
      >
        The page you’re looking for might have been removed, renamed, or doesn’t exist.
      </motion.p>

      {/* Animated button */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <FaArrowLeftLong />
          Back to Home
        </Link>
      </motion.div>

      {/* Floating animation element */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 text-emerald-500 text-4xl opacity-50"
      >
        🌿
      </motion.div>
    </div>
  );
};

export default ErrorPage;
