import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosInstance from "../Hook/useAxiosInstance";
import TipsCard from "./TipsCard";
import {motion} from "motion/react"
const RecentTips = () => {
  const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axiosInstance.get("/tips/recent").then((data) => setTips(data.data));
  }, [axiosInstance]);

  return (
    <div className="py-10 container mx-auto">
      <h1 className="font-bold text-2xl text-center"> Recent Tips</h1>
      <div className="flex flex-wrap justify-center pb-5 ">
        {tips.map((tip, index) => (
          <TipsCard key={index} tip={tip} />
        ))}
      </div>

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
