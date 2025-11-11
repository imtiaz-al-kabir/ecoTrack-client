import { use, useEffect, useState } from "react";
import SkeletonLoader from "../Components/SkeletonLoader";
import TipsCard from "../Components/TipsCard";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Tips = () => {
  const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    axiosInstance.get("/tips").then((data) => setTips(data.data));
  }, [axiosInstance]);

  return (
    <div className="py-10">
      {loading ? (
        <SkeletonLoader count={10}/>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto ">
          {tips.map((tip, index) => (
            <TipsCard key={index} tip={tip} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tips;
