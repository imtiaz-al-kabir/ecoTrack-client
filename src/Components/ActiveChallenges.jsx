import { motion } from "motion/react";
import { use, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import { ChallengeCard } from "./ChallengeCard";
import SkeletonLoader from "./SkeletonLoader";
const ActiveChallenges = () => {
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    axiosInstance
      .get("/challenges/sort")
      .then((data) => setChallenges(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto pt-5">
      <h1 className="text-3xl font-bold text-center text-emerald-600  pb-5">Active Challenges</h1>

      {loading ? (
        <SkeletonLoader count={5} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      )}

      <div className="text-center pt-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold px-4 py-2"
          >
            View All Challenges
            <FaArrowRightLong className="ml-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveChallenges;
