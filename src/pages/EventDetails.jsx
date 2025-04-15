import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/events/${id}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRSVP = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/api/events/${id}/rsvp`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      alert('RSVP successful!');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong.';
      alert('Failed to RSVP: ' + msg);
    }
  };

  const handleBackToEvents = () => {
    navigate('/events');
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  if (!event) return <div className="text-center text-gray-500 mt-10">Event not found</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">{event.title}</h1>
        <p className="mb-3 text-gray-700"><span className="font-semibold">📝 Description:</span> {event.description}</p>
        <p className="mb-2 text-gray-700"><span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleString()}</p>
        <p className="mb-2 text-gray-700"><span className="font-semibold">📍 Location:</span> {event.location}</p>
        <p className="mb-2 text-gray-700"><span className="font-semibold">🏷️ Category:</span> {event.category}</p>
        <p className="mb-2 text-gray-700"><span className="font-semibold">👥 Max Attendees:</span> {event.max_attendees}</p>
        <p className="mb-4 text-gray-700"><span className="font-semibold">👤 Created By:</span> {event.created_by}</p>

        <div className="flex space-x-4">
          <button
            onClick={handleRSVP}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            RSVP
          </button>
          <button
            onClick={handleBackToEvents}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded transition"
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
