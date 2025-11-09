import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosInstance from "../Hook/useAxiosInstance";
import Loading from "./Loading";

export function ChallengeCardDetails() {
  const { id } = useParams();
  const axiosInstance = useAxiosInstance();
  const [challenge, setChallenge] = useState(null);
  console.log(challenge);

  //   useEffect(() => {
  //     axiosInstance
  //       .get(`challenges/${id}`)
  //       .then((data) => console.log(data.data));
  //   }, [id, axiosInstance]);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axiosInstance.get(`http://localhost:3000/challenges/${id}`);
        // handle array or single object response
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setChallenge(data);
      } catch (err) {
        console.error("Error fetching challenge:", err);
      }
    };

    fetchChallenge();
  }, [id,axiosInstance]);

  if (!challenge) {
    return <Loading />;
  }
  return (
   <div className="py-10">
     <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <img
          src={challenge.photo}
          alt="image"
          className="w-full md:w-1/2  object-cover"
        />
        <div className="p-6 flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {challenge.title}
            </h2>
            <p className="text-emerald-600 font-medium">
              {challenge.category}
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {challenge.description} 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Duration:</span>
              {challenge.duration} days
            </p>
            <p>
              <span className="font-semibold">Target:</span>
              {challenge.target}
            </p>
            <p>
              <span className="font-semibold">Participants:</span>
              {challenge.participants}
            </p>
            <p>
              <span className="font-semibold">Impact Metric: </span>
              {challenge.impact}
            </p>
            <p>
              <span className="font-semibold">Start Date:</span>
              {challenge.startDate}
            </p>
            <p>
              <span className="font-semibold">End Date:</span>
              {challenge.endDate}
            </p>
          </div>

          <div className="pt-2 border-t text-sm text-gray-600">
            <p>
              <span className="font-semibold">Created By:</span>
              {challenge.createdBy}
            </p>
          </div>

          <div className="pt-4">
            <button
              //   onClick={() => onJoin && onJoin(challenge)}
              className="w-full md:w-auto rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2 transition-colors"
            >
              Join Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
