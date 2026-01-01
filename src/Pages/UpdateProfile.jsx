import { updatePassword, updateProfile } from "firebase/auth";
import { motion } from "motion/react";
import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../Firebase/firebase.config";

const UpdateProfile = () => {
  const { user, setUser } = use(AuthContext);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");

  console.log(name, photoURL, password);
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL || null,
        });

        if (password) {
          await updatePassword(auth.currentUser, password);
        }

        setUser({ ...user, displayName: name, photoURL });

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile information has been updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Profile update failed:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.message || "Something went wrong while updating your profile.",
      });
    } finally {
      setLoading(false);
      setPassword("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
              <img src={photoURL || "https://i.pravatar.cc/150?img=2"} alt="Profile" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <p className="text-gray-500 text-sm">Update your personal details</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white ${loading
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
