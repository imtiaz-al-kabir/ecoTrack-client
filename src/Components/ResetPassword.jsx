import { motion } from "motion/react";
import { use } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const ResetPassword = () => {
  const { resetPassword } = use(AuthContext);

  const handleReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    resetPassword(email)
      .then(() => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "🦄 Email has been sent! Please check your email.",
          showConfirmButton: false,
          timer: 1500,
        });
        // console.log("Password reset email sent to:", email);
        // window.open("https://mail.google.com/", "_blank");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to send reset email.",
          text: "Server error occurred!",
        });
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-[#f5f5f5]"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-10 w-[90%] max-w-md  shadow-2xl"
      >
        <h2 className="text-3xl font-orbitron text-center text-emerald-600 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              required
              name="email"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:border-emerald-500 outline-none transition-all"
              placeholder="user@you.com"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg 
              bg-linear-to-r from-emerald-400 to-teal-500
              hover:from-emerald-500 hover:to-teal-600 
              text-white font-semibold transition-all"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-emerald-500 hover:text-teal-500 font-semibold"
          >
            Go back to Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
