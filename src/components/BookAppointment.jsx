// src/components/BookAppointment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    patient_id: 1, // قيمة افتراضية مؤقتة
    specialist_id: 1, // قيمة افتراضية مؤقتة
    date: '',
    time: '',
    duration: '', // إضافة حقل duration
    description: '',
    parent_id: 1, // قيمة افتراضية مؤقتة
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/appointments/book', formData);
      alert('Appointment booked successfully!');
      setFormData({
        patient_id: 1,
        specialist_id: 1,
        date: '',
        time: '',
        duration: '',
        description: '',
        parent_id: 1,
      });
    } catch (err) {
      console.error('Failed to book appointment:', err);
      alert('Failed to book appointment.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Patient ID:</label>
          <input
            type="number"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Specialist ID:</label>
          <input
            type="number"
            name="specialist_id"
            value={formData.specialist_id}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Parent ID:</label>
          <input
            type="number"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;