import { useEffect, useState } from "react";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Stats = () => {
  const axiosInstance = useAxiosInstance();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        axiosInstance.get("/stats").then((result) => setStats(result.data));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [axiosInstance]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center">Live Statistics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5">
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <div className="mb-2 text-green-400 text-2xl">🌱</div>
          <div className="text-3xl font-bold">{stats.activeChallenges}</div>
          <div className="text-gray-500">Active Challenges</div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow text-center">
          <div className="mb-2 text-green-400 text-2xl">👥</div>
          <div className="text-3xl font-bold">{stats.totalParticipants}</div>
          <div className="text-gray-500">Total Participants</div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow text-center">
          <div className="mb-2 text-green-400 text-2xl">📈</div>
          <div className="text-3xl font-bold">{stats.co2Saved} kg</div>
          <div className="text-gray-500">CO₂ Saved</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
