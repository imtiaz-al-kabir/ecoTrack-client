import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UserChallenges = () => {
  const axiosInstance = useAxiosInstance();
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    axiosInstance.get("/userChallenges").then((res) => setJoined(res.data));
  }, [axiosInstance]);

  const statusColors = {
    "Not Started": "text-gray-600",
    Ongoing: "text-yellow-600",
    Finished: "text-green-600",
  };

  return (
    <div className="container mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold mb-6 text-emerald-600">All Joined Challenges</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {joined.map((jc) => (
          <motion.div
            key={jc._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-linear-to-r from-green-100 to-green-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow"
          >
            <p>
              <span className="font-semibold">User:</span> {jc.userId}
            </p>
            <p>
              <span className="font-semibold">Challenge ID:</span> {jc.challengeId}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={statusColors[jc.status] || "text-gray-600"}>
                {jc.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(jc.joinDate).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserChallenges;
