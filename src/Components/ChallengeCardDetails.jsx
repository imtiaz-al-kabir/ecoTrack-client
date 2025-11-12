import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Loading from "./Loading";

const ChallengeCardDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  const showToast = (icon, title) => {
    Swal.fire({
      toast: true,
      icon,
      title,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const getChallengeIdString = (challengeId) => {
    if (typeof challengeId === "string") return challengeId;
    if (challengeId?.$oid) return challengeId.$oid;
    if (challengeId?._id) return challengeId._id.toString();
    return challengeId?.toString();
  };

  // 🔹 Fetch challenge
  const fetchChallenge = async () => {
    try {
      const { data } = await axiosInstance.get(`/challenges/${id}`);
      setChallenge(data);
    } catch (err) {
      console.error("Error fetching challenge:", err);
      showToast("error", "Failed to load challenge");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Check if joined
  const checkJoined = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(`/userChallenges/${user.email}`);
      const hasJoined = res.data.some((jc) => {
        const joinedChallengeId = getChallengeIdString(jc.challengeId);
        return joinedChallengeId === id;
      });
      setJoined(hasJoined);
    } catch (err) {
      console.error("Error checking joined status:", err);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, [id]);

  useEffect(() => {
    checkJoined();
  }, [user, id]);

  // 🔹 Handle Join
  const handleJoin = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must log in first to join this challenge!",
      });
      return;
    }

    if (joined) return;

    try {
      const res = await axiosSecure.post("/userChallenges", {
        userId: user.email,
        challengeId: id,
      });

      if (res.data?.insertedId) {
        showToast("success", "Joined challenge successfully!");
        setJoined(true);
        fetchChallenge();
      } else if (res.status === 200 && res.data?.message?.includes("Already")) {
        showToast("info", "You've already joined this challenge");
      }
    } catch (err) {
      console.error(err);
      showToast(
        "error",
        err.response?.data?.message || "Failed to join challenge"
      );
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the challenge!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/challenges/${id}`);
          Swal.fire("Deleted!", "Challenge has been deleted.", "success");
          navigate("/challenges");
        } catch (err) {
          console.error("Error deleting challenge:", err);
          showToast("error", "Failed to delete challenge");
        }
      }
    });
  };

  const handleUpdate = () => {
    navigate(`/update-challenge/${id}`);
  };

  if (loading || !challenge) return <Loading />;

  const isCreator = user?.email === challenge.createdBy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-10"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row">
          <motion.img
            src={challenge.photo}
            alt={challenge.title}
            className="w-full md:w-1/2 object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          <div className="p-6 flex-1 space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-emerald-600">
                {challenge.title}
              </h2>
              <p className="text-lg text-emerald-500 font-medium">
                {challenge.category}
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {challenge.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {challenge.duration} days
              </p>
              <p>
                <span className="font-semibold">Target:</span>{" "}
                {challenge.target}
              </p>
              <p>
                <span className="font-semibold">Participants:</span>{" "}
                {challenge.participants || 0}
              </p>
              <p>
                <span className="font-semibold">Impact Metric:</span>{" "}
                {challenge.impact}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span>{" "}
                {new Date(challenge.startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">End Date:</span>{" "}
                {new Date(challenge.endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Created By:</span>{" "}
                {challenge.createdBy}
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <motion.button
                onClick={handleJoin}
                disabled={joined}
                whileTap={{ scale: joined ? 1 : 0.95 }}
                className={`rounded-lg text-white text-sm font-medium px-6 py-2 transition-colors ${
                  joined
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {joined ? "Joined" : "Join Challenge"}
              </motion.button>

              {isCreator && (
                <>
                  <motion.button
                    onClick={handleUpdate}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    Update
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-6 py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCardDetails;
