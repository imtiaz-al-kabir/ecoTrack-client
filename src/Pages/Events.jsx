import { use, useEffect, useState } from "react";
import EventsCard from "../Components/EventsCard";
import SkeletonLoader from "../Components/SkeletonLoader";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Events = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    axiosInstance.get("/events").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  return (
    <div className="py-10">
      {loading ? (
        <SkeletonLoader count={10} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto ">
          {events.map((event, index) => (
            <EventsCard key={index} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
