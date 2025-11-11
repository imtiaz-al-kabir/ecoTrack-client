import { use, useEffect, useState } from "react";
import { ChallengeCard } from "../Components/ChallengeCard";
import SkeletonLoader from "../Components/SkeletonLoader";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Challenges = () => {
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    axiosInstance.get("/challenges").then((data) => setChallenges(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Challenges;
