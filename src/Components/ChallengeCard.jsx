import { motion } from "motion/react";
import { Link } from "react-router";

export function ChallengeCard({ challenge }) {
  const { category, description, duration, participants, photo, title, _id } =
    challenge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all duration-300"
    >
      {/* Image */}
      <img
        src={photo}
        alt={title}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-emerald-600 font-medium">{category}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
            <span>⏱ {duration} days</span>
            <span>👥 {participants} joined</span>
          </div>
        </div>

        {/* Button always visible & aligned bottom */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pt-4 mt-auto"
        >
          <Link
            to={`/challenges/${_id}`}
            className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium text-sm py-2 rounded-lg shadow-md transition-colors"
          >
            View Details
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
