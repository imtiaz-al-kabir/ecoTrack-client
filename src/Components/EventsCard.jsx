import React from "react";

const EventsCard = ({ event }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5 m-3 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-xl mb-2">{event.title}</h2>
        <p className="text-gray-700 text-base mb-2">{event.description}</p>
        <p className="text-sm text-gray-500 mb-1">
          📍 Location: {event.location}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          🗓 Date: {new Date(event.date).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          👤 Organizer: {event.organizerName} ({event.organizer})
        </p>
        <p className="text-sm text-gray-500">
          Participants: {event.currentParticipants}/{event.maxParticipants}
        </p>
      </div>
    </div>
  );
};

export default EventsCard;
