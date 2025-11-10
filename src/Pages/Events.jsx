import { useEffect, useState } from "react";
import EventsCard from "../Components/EventsCard";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Events = () => {
  const axiosInstance = useAxiosInstance();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axiosInstance.get("/events").then((data) => setEvents(data.data));
  }, [axiosInstance]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto py-10">
      {events.map((event, index) => (
        <EventsCard key={index} event={event} />
      ))}
    </div>
  );
};

export default Events;
