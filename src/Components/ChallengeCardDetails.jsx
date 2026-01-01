import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaMedal,
  FaUsers,
} from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Loading from "./Loading";
import { FaShareAlt } from "react-icons/fa";

const ChallengeCardDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const location = useLocation();

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

  const handleJoin = async () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must log in first to join this challenge!",
      });
      navigate("/login", { state: { from: location.pathname } });
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
    navigate(`/dashboard/update-challenge/${id}`);
  };

  if (loading || !challenge) return <Loading />;

  const isCreator = user?.email === challenge.createdBy;

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Detail Header / Hero */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0">
          <img
            src={challenge.photo}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/50 to-transparent"></div>
        </div>

        <div className="absolute top-6 left-6 z-10">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost bg-base-100/50 hover:bg-base-100 backdrop-blur-md border border-white/20"
          >
            <FaArrowLeft size={18} />
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="badge badge-primary font-bold mb-4">
              {challenge.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {challenge.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm md:text-base opacity-90 font-medium">
              <span className="flex items-center gap-2">
                <FaClock className="text-primary" /> {challenge.duration} Days
              </span>
              <span className="flex items-center gap-2">
                <FaUsers className="text-secondary" /> {challenge.participants}{" "}
                Participants
              </span>
              <span className="flex items-center gap-2">
                <FaMedal className="text-warning" /> {challenge.impact}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs Navigation */}
            <div className="tabs tabs-lifted mb-6">
              {["Overview", "Key Info", "Reviews"].map((tab) => (
                <a
                  key={tab}
                  className={`tab tab-lg font-bold ${
                    activeTab === tab.toLowerCase().replace(" ", "")
                      ? "tab-active text-primary"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveTab(tab.toLowerCase().replace(" ", ""))
                  }
                >
                  {tab}
                </a>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-base-200/50 p-6 rounded-2xl min-h-[300px]">
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="text-2xl font-bold mb-4">
                    About this Challenge
                  </h3>
                  <p className="text-lg leading-relaxed text-base-content/80 whitespace-pre-wrap">
                    {challenge.description}
                  </p>

                  <div className="mt-8 p-4 bg-primary/10 border-l-4 border-primary rounded-r-lg">
                    <h4 className="font-bold text-primary mb-2">Target Goal</h4>
                    <p>{challenge.target}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "keyinfo" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="stat bg-base-100 rounded-xl shadow-sm">
                    <div className="stat-figure text-primary">
                      <FaCalendar size={24} />
                    </div>
                    <div className="stat-title">Start Date</div>
                    <div className="stat-value text-lg">
                      {new Date(challenge.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="stat bg-base-100 rounded-xl shadow-sm">
                    <div className="stat-figure text-primary">
                      <FaCalendar size={24} />
                    </div>
                    <div className="stat-title">End Date</div>
                    <div className="stat-value text-lg">
                      {new Date(challenge.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="stat bg-base-100 rounded-xl shadow-sm col-span-full">
                    <div className="stat-title">Created By</div>
                    <div className="stat-value text-lg text-secondary truncate">
                      {challenge.createdBy}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <span className="text-6xl">💬</span>
                  <h3 className="text-xl font-bold mt-4">Community Reviews</h3>
                  <p className="opacity-60">
                    Join the challenge to leave a review!
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="w-full md:w-80 space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-xl">Join the Action</h3>
                <p className="text-sm opacity-70 mb-4">
                  Commit to this challenge and track your progress!
                </p>

                <button
                  onClick={handleJoin}
                  disabled={joined}
                  className={`btn btn-lg w-full ${
                    joined
                      ? "btn-disabled"
                      : "btn-primary text-white shadow-lg shadow-primary/30"
                  }`}
                >
                  {joined ? "Joined ✓" : "Join Now"}
                </button>

                {isCreator && <div className="divider text-xs">Manage</div>}

                {isCreator && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleUpdate}
                      className="btn btn-outline btn-info btn-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-outline btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="card-title text-base">Share</h3>
                <div className="flex gap-2">
                  <button className="btn btn-circle btn-sm btn-ghost bg-base-200 hover:bg-blue-500 hover:text-white">
                    <FaUsers />
                  </button>
                  <button className="btn btn-circle btn-sm btn-ghost bg-base-200 hover:bg-sky-400 hover:text-white">
                    <FaShareAlt />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCardDetails;
