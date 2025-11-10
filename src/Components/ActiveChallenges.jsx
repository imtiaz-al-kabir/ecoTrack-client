import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosInstance from "../Hook/useAxiosInstance";
import { ChallengeCard } from "./ChallengeCard";

const ActiveChallenges = () => {
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/challenges/sort")
      .then((data) => setChallenges(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto pt-5">
      <h1 className="text-2xl font-bold text-center">Active Challenges</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
      </div>
      <div className="text-center pt-5">
        <Link
          to="/challenges"
          className="btn bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold"
        >
          View All Challenges{" "}
          <span>
            <FaArrowRightLong />
          </span>{" "}
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallenges;
