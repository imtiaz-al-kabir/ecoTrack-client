import { use, useEffect, useState } from "react";
import EventsCard from "../Components/EventsCard";
import SkeletonLoader from "../Components/SkeletonLoader";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";


import { motion } from "motion/react";




const Events = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = use(AuthContext);

  useEffect(() => {
    axiosInstance.get("/events").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  const filteredEvents = events.filter((event) =>
    (event.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (event.location?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Hero Section */}
      <div className="relative bg-emerald-900 text-white py-24 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="container mx-auto px-5 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Upcoming Eco Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-90 max-w-2xl mx-auto mb-8"
          >
            Join workshops, clean-up drives, and community gatherings to make a tangible difference.
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
              placeholder="Search by event or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-lg w-full rounded-full pl-6 pr-12 text-gray-800 shadow-xl focus:ring-4 focus:ring-emerald-500/30 border-none"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-circle btn-primary btn-sm text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-5">
        {loading ? (
          <SkeletonLoader count={8} />
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl font-bold mb-2">No events found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <EventsCard key={index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
