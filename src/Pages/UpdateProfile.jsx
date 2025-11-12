import { motion } from "motion/react";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UpdateProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photo = e.target.photo.value.trim();
    const password = e.target.password.value.trim();

    if (!name || !email) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Name and email are required.",
      });
      setLoading(false);
      return;
    }

    const updatedProfile = { name, email, photo, password };

    try {
      // 🔹 Update on your backend (you can adjust endpoint)
      const res = await axiosInstance.put(`/users/${user?.email}`, updatedProfile);

      if (res.data.modifiedCount > 0 || res.status === 200) {
        setUser({ ...user, displayName: name, photoURL: photo });
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile information has been updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "Your profile is already up to date.",
        });
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex justify-center items-center bg-gradient-to-r from-emerald-400/60 to-teal-500/50 py-10"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-600 mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName || ""}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email || ""}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              readOnly
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photo"
              defaultValue={user?.photoURL || ""}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {loading ? "Updating..." : "Update Profile"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;
