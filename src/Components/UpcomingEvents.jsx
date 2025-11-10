import { useEffect, useState } from "react";
import EventsCard from "../Components/EventsCard";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UpcomingEvents = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get("/events/upcoming").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  return (
    <div className="flex flex-wrap justify-center">
      {events.map((event, index) => (
        <EventsCard key={index} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEvents;
