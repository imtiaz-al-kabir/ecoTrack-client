import { motion } from "motion/react";

const TipsCard = ({ tip }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className=" rounded-2xl overflow-hidden shadow-lg bg-white p-6 m-4 hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="font-bold text-2xl mb-3 text-emerald-600">
        {tip.title}
      </div>
      <p className="text-gray-700 text-base mb-3">{tip.content}</p>
      <div className="flex flex-col gap-1 text-sm text-gray-500 mb-3">
        <span>
          Category: <span className="font-medium">{tip.category}</span>
        </span>
        <span>
          By: <span className="font-medium">{tip.authorName}</span> (
          {tip.author})
        </span>
        <span>
          Upvotes: <span className="font-medium">{tip.upvotes}</span>
        </span>
      </div>
      <p className="text-xs text-gray-400">
        Created At: {new Date(tip.createdAt).toLocaleDateString()}
      </p>
    </motion.div>
  );
};

export default TipsCard;
