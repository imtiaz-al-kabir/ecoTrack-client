import { useEffect, useState } from "react";
import TipsCard from "../Components/TipsCard";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Tips = () => {
  const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);

  useEffect(() => {
    axiosInstance.get("/tips").then((data) => setTips(data.data));
  }, [axiosInstance]);

  return (
    <div className="flex flex-wrap justify-center">
      {tips.map((tip, index) => (
        <TipsCard key={index} tip={tip} />
      ))}
    </div>
  );
};

export default Tips;
