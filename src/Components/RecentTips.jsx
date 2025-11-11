import { motion } from "motion/react";
import { use, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import SkeletonLoader from "./SkeletonLoader";
import TipsCard from "./TipsCard";
const RecentTips = () => {
  const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    axiosInstance.get("/tips/recent").then((data) => setTips(data.data));
  }, [axiosInstance]);

  return (
    <div className="py-10 container mx-auto">
      <h1 className="text-3xl font-bold text-center text-emerald-600  pb-5">
        {" "}
        Recent Tips
      </h1>
      {loading ? (
        <SkeletonLoader count={5} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pb-5 ">
          {tips.map((tip, index) => (
            <TipsCard key={index} tip={tip} />
          ))}
        </div>
      )}

      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/tips"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold px-4 py-2"
          >
            View All Tips
            <FaArrowRightLong className="ml-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RecentTips;
