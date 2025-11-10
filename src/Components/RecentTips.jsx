import React, { useEffect, useState } from 'react';
import useAxiosInstance from "../Hook/useAxiosInstance";
import TipsCard from "./TipsCard";

const RecentTips = () => {
   const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axiosInstance.get("/tips/recent").then((data) => setTips(data.data));
  }, [axiosInstance]);

  return (
    <div className="flex flex-wrap justify-center">
      {tips.map((tip, index) => (
        <TipsCard key={index} tip={tip} />
      ))}
    </div>
    );
};

export default RecentTips;