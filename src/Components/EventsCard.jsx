import { motion } from "motion/react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";

const EventsCard = ({ event }) => {
  const {
    title,
    description,
    location,
    date,
    organizer,
    organizerName,
    currentParticipants,
    maxParticipants,
  } = event;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden p-5 m-3 flex flex-col justify-between transition-shadow"
    >
      <div>
        {/* Title */}
        <h2 className="font-bold text-2xl text-emerald-600 mb-2">{title}</h2>

        {/* Description */}
        <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 text-gray-600 text-sm">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-emerald-500" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-emerald-500" />
            {new Date(date).toLocaleString()}
          </p>
          <p className="flex items-center gap-2">
            <FaUserTie className="text-emerald-500" /> {organizerName} (
            {organizer})
          </p>
          <p className="flex items-center gap-2">
            <FaUserFriends className="text-emerald-500" />
            {currentParticipants}/{maxParticipants} participants
          </p>
        </div>
      </div>

      {/* Button Section */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
      >
        Join Event
      </motion.button>
    </motion.div>
  );
};

export default EventsCard;
