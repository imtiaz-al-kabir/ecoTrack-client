import { use, useEffect, useState } from "react";
import SkeletonLoader from "../Components/SkeletonLoader";
import TipsCard from "../Components/TipsCard";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

import { motion } from "motion/react";

const Tips = () => {
  const axiosInstance = useAxiosInstance();
  const [tips, setTips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = use(AuthContext);

  useEffect(() => {
    axiosInstance.get("/tips").then((data) => setTips(data.data));
  }, [axiosInstance]);

  const filteredTips = tips.filter(
    (tip) =>
      (tip.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (tip.category?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Hero Section */}
      <div className="relative bg-teal-900 text-white py-24 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80')] bg-cover bg-center opacity-30 transform scale-x-[-1]"></div>
        <div className="container mx-auto px-5 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Sustainable Living Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-90 max-w-2xl mx-auto mb-8"
          >
            Discover practical advice and habits to reduce your footprint and
            live greener.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <input
              type="text"
              placeholder="Search tips or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-lg w-full rounded-full pl-6 pr-12 text-base-content shadow-xl focus:ring-4 focus:ring-teal-500/30 border-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-accent btn-sm text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-5">
        {loading ? (
          <SkeletonLoader count={8} />
        ) : filteredTips.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl font-bold mb-2">No tips found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip, index) => (
              <TipsCard key={index} tip={tip} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tips;
