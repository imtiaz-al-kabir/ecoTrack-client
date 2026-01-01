import { motion } from "motion/react";
import { Link } from "react-router";
import { FaClock, FaUsers } from "react-icons/fa6";

export function ChallengeCard({ challenge }) {
  const { category, description, duration, participants, photo, title, _id } =
    challenge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-base-200 group"
    >
      <figure className="relative h-48 overflow-hidden">
        <img
          src={photo}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 badge badge-secondary font-bold shadow-md">
          {category}
        </div>
      </figure>

      <div className="card-body p-6 flex flex-col flex-1">
        <h3 className="card-title text-lg font-bold text-base-content group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-base-content/70 line-clamp-2 mb-4">
          {description}
        </p>

        <div className="flex items-center justify-between text-xs text-base-content/60 font-medium mt-auto border-t border-base-200 pt-4">
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>{duration} Days</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-secondary" />
            <span>{participants} joined</span>
          </div>
        </div>

        <div className="card-actions mt-6">
          <Link
            to={`/challenges/${_id}`}
            className="btn btn-primary btn-block text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
