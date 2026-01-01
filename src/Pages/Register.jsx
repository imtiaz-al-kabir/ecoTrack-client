import { motion } from "motion/react";
import { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa6";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, googleLogin, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterForm = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
    if (!passRegex.test(password)) {
      setError(
        "Password must have at least 1 uppercase, 1 lowercase, 1 special character and be 6+ chars long."
      );
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate(location.state ? location.state : "/dashboard");
            Swal.fire({
              icon: 'success',
              title: 'Welcome to EcoTrack!',
              text: 'Registration successful.',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((err) => {
            console.error(err);
            setError("Failed to update profile. Please try again.");
          });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate(location.state ? location.state : "/dashboard"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">

        {/* Right Side - Visual */}
        <div className="hidden md:flex md:w-1/2 bg-secondary relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-primary opacity-90"></div>
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2670&auto=format&fit=crop"
            alt="Nature"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="relative z-10 text-primary-content text-left space-y-6">
            <h1 className="text-5xl font-bold">Join the Movement</h1>
            <p className="text-lg opacity-90">Start your journey towards a sustainable lifestyle today. Every small step counts.</p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl"></div>
        </div>

        {/* Left Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
        >
          <div className="text-center md:text-left mb-6">
            <h2 className="text-3xl font-bold text-base-content mb-2">Create Account</h2>
            <p className="text-base-content/60">Join our community of eco-warriors</p>
          </div>

          <form onSubmit={handleRegisterForm} className="space-y-4">

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Full Name</span></label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="name" type="text" placeholder="John Doe" className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" placeholder="name@example.com" className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Photo URL</span></label>
              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="photo" type="url" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50" required />
              </div>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Password</span></label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="password" type="password" placeholder="Create a password" className="input input-bordered w-full pl-12 rounded-xl focus:input-primary bg-base-200/50" required />
              </div>
            </div>

            {error && <div className="alert alert-error text-sm py-2 rounded-lg"><span>{error}</span></div>}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full rounded-xl text-white text-lg shadow-lg shadow-primary/30 mt-4"
            >
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
          </form>

          <div className="divider my-6">OR</div>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full rounded-xl hover:bg-base-200 border-base-300"
          >
            <FaGoogle className="text-red-500" /> Sign up with Google
          </button>

          <p className="text-center mt-6 text-base-content/60">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
