import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const BookAppointment = () => {
  const [specialists, setSpecialists] = useState([]);
  const [formData, setFormData] = useState({
    appointment_id: '',
    patient_id: '',
    specialist_id: '',
    date_time: '',
    duration: '',
    description: '',
    is_fast_track: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await api.get('/specialists');
        setSpecialists(response.data);
      } catch (err) {
        setError('Failed to fetch specialists: ' + err.message);
      }
    };
    fetchSpecialists();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/appointments/book', {
        ...formData,
        appointment_id: parseInt(formData.appointment_id),
        patient_id: parseInt(formData.patient_id),
        specialist_id: parseInt(formData.specialist_id),
        duration: parseInt(formData.duration),
      });
      navigate('/parent');
    } catch (err) {
      setError('Failed to book appointment: ' + err.message);
    }
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Book Appointment</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="mb-4">
            <label className="block text-gray-700">Appointment ID</label>
            <input
              type="number"
              name="appointment_id"
              value={formData.appointment_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Specialist</label>
            <select
              name="specialist_id"
              value={formData.specialist_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Specialist</option>
              {specialists.map((specialist) => (
                <option key={specialist.specialist_id} value={specialist.specialist_id}>
                  {specialist.specialty} (ID: {specialist.specialist_id})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date and Time</label>
            <input
              type="datetime-local"
              name="date_time"
              value={formData.date_time}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              <input
                type="checkbox"
                name="is_fast_track"
                checked={formData.is_fast_track}
                onChange={handleChange}
              />
              Fast Track
            </label>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;