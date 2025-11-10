import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Stats = () => {
  const axiosInstance = useAxiosInstance();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await axiosInstance.get("/stats");
        setStats(result.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, [axiosInstance]);

  const statItems = [
    { icon: "🌱", label: "Active Challenges", value: stats.activeChallenges },
    { icon: "👥", label: "Total Participants", value: stats.totalParticipants },
    {
      icon: "📈",
      label: "CO₂ Saved",
      value: stats.co2Saved ? `${stats.co2Saved} kg` : undefined,
    },
  ];

  return (
    <div className="container mx-auto py-10 px-5">
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8">
        Live Statistics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg flex flex-col items-center justify-center"
          >
            <div className="mb-2 text-3xl">{item.icon}</div>
            <div className="text-4xl font-bold text-emerald-700">
              {item.value ?? "0"}
            </div>
            <div className="text-gray-500 mt-1 text-sm">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
