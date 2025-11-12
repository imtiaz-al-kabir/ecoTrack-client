import { motion } from "motion/react";
import { use, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import EventsCard from "../Components/EventsCard";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import SkeletonLoader from "./SkeletonLoader";
const UpcomingEvents = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);
  const { loading } = use(AuthContext);

  useEffect(() => {
    axiosInstance.get("/events/upcoming").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto pb-10">
      <h1 className="text-3xl font-bold text-center text-emerald-600  pb-5">
        Upcoming Events
      </h1>
      {loading ? (
        <SkeletonLoader count={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event, index) => (
            <EventsCard key={index} event={event} />
          ))}
        </div>
      )}

      <div className="text-center pt-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold px-4 py-2"
          >
            View More Events
            <FaArrowRightLong className="ml-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
