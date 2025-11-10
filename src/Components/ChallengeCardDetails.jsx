import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import Loading from "./Loading";

const ChallengeCardDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const { user } = useContext(AuthContext);

  const [challenge, setChallenge] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  const getChallengeIdString = (challengeId) => {
    if (typeof challengeId === "string") return challengeId;
    if (challengeId?.$oid) return challengeId.$oid;
    if (challengeId?._id) return challengeId._id.toString();
    return challengeId?.toString();
  };

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data } = await axiosInstance.get(`/challenges/${id}`);
        setChallenge(data);
      } catch (err) {
        console.error("Error fetching challenge:", err);
        toast.error("Failed to load challenge");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id, axiosInstance]);

  useEffect(() => {
    const checkJoined = async () => {
      if (!user?.email || !id) return;
      try {
        const res = await axiosInstance.get(`/userChallenges/${user.email}`);
        const hasJoined = res.data.some((jc) => {
          const joinedChallengeId = getChallengeIdString(jc.challengeId);
          return joinedChallengeId === id;
        });
        setJoined(hasJoined);
      } catch (err) {
        console.error("Error checking joined status:", err);
      }
    };
    checkJoined();
  }, [user, id, axiosInstance]);

  const handleJoin = async () => {
    if (!user?.email) return toast.error("Please log in to join a challenge.");
    if (joined) return;

    setJoined(true);

    try {
      const res = await axiosInstance.post("/userChallenges", {
        userId: user.email,
        challengeId: id,
      });
      if (res.data?.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Joined challenge successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setChallenge((prevChallenge) => ({
          ...prevChallenge,
          participants: (prevChallenge.participants || 0) + 1,
        }));
      } else if (
        res.status === 200 &&
        res.data?.message?.includes("Already joined")
      ) {
        toast("You've already joined this challenge.", { icon: "ℹ️" });
      }
    } catch (err) {
      console.error(err);
      setJoined(false);
      toast.error(err.response?.data?.message || "Failed to join challenge.");
    }
  };

  if (loading || !challenge) return <Loading />;

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
            alt="Challenge"
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
            </div>
            <div className="pt-4">
              <motion.button
                onClick={handleJoin}
                disabled={joined}
                whileTap={{ scale: joined ? 1 : 0.95 }}
                className={`w-full md:w-auto rounded-lg text-white text-sm font-medium px-6 py-2 transition-colors ${
                  joined
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {joined ? "Joined" : "Join Challenge"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeCardDetails;
