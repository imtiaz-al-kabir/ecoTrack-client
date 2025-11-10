import { useEffect, useState } from "react";
import { ChallengeCard } from "../Components/ChallengeCard";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Challenges = () => {
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axiosInstance.get("/challenges").then((data) => setChallenges(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge._id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default Challenges;
