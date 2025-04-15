import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: '',
    max_attendees: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...form,
        date: `${form.date} 00:00`,
        max_attendees: parseInt(form.max_attendees), // convert to number
      };

      console.log(token)

      const res = await fetch('http://127.0.0.1:5000/api/events/', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      alert('Event created!');
      navigate('/events');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form className="p-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Create Event</h2>
      {['title', 'description', 'date', 'location', 'category', 'max_attendees'].map((field) => (
        <input
          key={field}
          type={field === 'date' ? 'date' : 'text'}
          name={field}
          placeholder={field.replace('_', ' ')}
          value={form[field]}
          onChange={handleChange}
          className="block w-full mb-3 p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create
      </button>
      <button
        type="button"
        onClick={() => navigate('/events')}
        className="bg-gray-400 text-white px-4 py-2 ml-4 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateEvent;
