import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/events')
      .then(res => {
        console.log(res.data);
        setEvents(res.data.events);
      })
      .catch(err => setError(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (error) return <div className="text-center text-red-600 mt-6">Error fetching events</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">All Events</h2>
        <div className="flex gap-3">
          {user?.is_admin && (
            <Link
              to="/create-event"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
            >
              Create Event
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No events found</p>
      )}
    </div>
  );
};

export default Events;
