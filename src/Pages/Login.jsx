import { motion } from "motion/react";
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaGoogle, FaEnvelope, FaLock, FaUserSecret } from "react-icons/fa6";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, googleLogin } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  // Demo Credentials
  const handleDemoLogin = () => {
    setLoading(true);
    loginUser("demo@ecotrack.com", "Democratic123") // Assuming these exist or will create
      .then(() => {
        navigate(location.state ? location.state : "/dashboard");
        Swal.fire({
          icon: 'success',
          title: 'Welcome back, Demo User!',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Demo Login Failed',
          text: 'Please try standard login.'
        });
      })
      .finally(() => setLoading(false));
  };

  const handleLoginForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/dashboard");
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.message
        });
      })
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        navigate(location.state ? location.state : "/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Left Side - Visual */}
        <div className="hidden md:flex md:w-1/2 bg-primary relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
            alt="Nature"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="relative z-10 text-primary-content text-left space-y-6">
            <h1 className="text-5xl font-bold">Welcome Back!</h1>
            <p className="text-lg opacity-90">Keep tracking your eco-friendly habits and making a difference. Your journey to a greener planet continues here.</p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-bold text-base-content mb-2">Sign In</h2>
            <p className="text-base-content/60">Access your dashboard and challenges</p>
          </div>

          <form onSubmit={handleLoginForm} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50"
                  required
                />
              </div>
              <label className="label">
                <Link to="/reset-password" class="label-text-alt link link-hover text-primary">Forgot password?</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-white text-lg shadow-lg shadow-primary/30"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogle}
              className="btn btn-outline w-full rounded-xl hover:bg-base-200 border-base-300"
            >
              <FaGoogle className="text-red-500" /> Google
            </button>
            <button
              onClick={handleDemoLogin}
              className="btn btn-outline w-full rounded-xl hover:bg-base-200 border-base-300"
            >
              <FaUserSecret className="text-base-content" /> Demo
            </button>
          </div>

          <p className="text-center mt-8 text-base-content/60">
            New to EcoTrack?{' '}
            <Link to="/register" className="text-primary font-bold hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
