import { motion } from "motion/react";
import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, googleLogin } = use(AuthContext);

  const handleLoginForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        navigate(location.state?.from || "/");
      })
      .catch((err) => console.log(err));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        navigate(location.state?.from || "/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-md"
      >
        <form
          onSubmit={handleLoginForm}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl text-gray-900 font-medium"
          >
            Sign in
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm text-center"
          >
            Don't have an account?{" "}
            <Link className="text-emerald-400 hover:underline" to="/register">
              Sign up
            </Link>
          </motion.p>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center w-full border border-gray-300 rounded-full h-12 px-4 gap-2"
          >
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="outline-none w-full bg-transparent text-gray-600 placeholder-gray-400"
              required
            />
          </motion.div>

          {/* Remember & Forgot */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full flex justify-between items-center text-gray-500 text-sm"
          >
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              Remember me
            </label>
            <Link className="underline" to="#">
              Forgot password?
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white py-2 transition-all"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center my-6 gap-4"
        >
          <div className="flex-1 h-px bg-gray-300" />
          <p className="text-gray-400 text-sm text-center">
            or sign in with Google
          </p>
          <div className="flex-1 h-px bg-gray-300" />
        </motion.div>

        {/* Google Login */}
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
            Sign in with Google
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
