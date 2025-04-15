import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
    <Link to={`/events/${event.id}`} className="block h-full">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{event.title}</h2>
      <p className="text-gray-800 mb-3 line-clamp-3">{event.description}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">📅 Date:</span> {event.date}</p>
        <p><span className="font-medium">📍 Location:</span> {event.location}</p>
      </div>
    </Link>
  </div>
);

export default EventCard;
