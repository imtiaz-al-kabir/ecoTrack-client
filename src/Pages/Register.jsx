import { motion } from "motion/react";
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, googleLogin } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const handleRegisterForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passRegex.test(password)) {
      setError(
        "Password must have at least 1 uppercase, 1 lowercase,at least 1 special characters and at least 6 characters long."
      );
      return;
    }

    createUser(email, password)
      .then(() => navigate(location.state ? location.state : "/"))
      .catch((err) => console.log(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate(location.state ? location.state : "/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen px-5 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <form
          onSubmit={handleRegisterForm}
          className="flex flex-col items-center justify-center space-y-4"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl text-gray-900 font-medium text-center"
          >
            Join Eco<span className="text-emerald-400">Track</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm text-center"
          >
            Already have an account?{" "}
            <Link className="text-emerald-400 hover:underline" to="/login">
              Sign in
            </Link>
          </motion.p>

          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <input
              name="name"
              type="text"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              placeholder="Full Name"
              required
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <input
              name="email"
              type="email"
              placeholder="Email id"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              required
            />
          </motion.div>

          {/* Photo URL Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <input
              name="photo"
              type="url"
              placeholder="Photo URL"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              required
            />
          </motion.div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {/* Register Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full rounded-xl bg-linear-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white py-2 transition-all"
          >
            Sign up
          </motion.button>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center my-6 gap-4"
        >
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-gray-400 text-sm text-center">
            or sign up with Google
          </p>
          <div className="flex-1 h-px bg-gray-300" />
        </motion.div>

        {/* Google Sign-up */}
        <motion.button
          onClick={handleGoogle}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-full flex items-center justify-center h-12 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
            alt="Google Logo"
            className="h-6"
          />
          <span className="ml-2 text-gray-700 font-medium">
            Sign up with Google
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Register;
