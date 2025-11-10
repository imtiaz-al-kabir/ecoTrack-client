import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import EventsCard from "../Components/EventsCard";
import useAxiosInstance from "../Hook/useAxiosInstance";
const UpcomingEvents = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get("/events/upcoming").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  return (
    <div className="container mx-auto pb-10">
      <h1 className="font-bold text-2xl text-center">Upcoming Events</h1>
      <div className="flex flex-wrap justify-center">
        {events.map((event, index) => (
          <EventsCard key={index} event={event} />
        ))}
      </div>

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
