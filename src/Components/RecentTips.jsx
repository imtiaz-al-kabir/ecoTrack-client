import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import useAxiosInstance from "../Hook/useAxiosInstance";
import TipsCard from "./TipsCard";

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
        <Link
        to="/tips"
        className="btn bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold">
          View All Tips
          <span>
            {" "}
            <FaArrowRightLong />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RecentTips;
