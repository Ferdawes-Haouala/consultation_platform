import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const ParentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    specialist_id: '',
    date_time: '',
    duration: '',
    description: '',
    notes: '',
    is_fast_track: false,
  });
  const [medicalHistory, setMedicalHistory] = useState({
    diagnosis: '',
    symptoms: '',
    previous_treatments: '',
    learning_difficulty_details: '',
    family_history: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    console.log('ParentDashboard role:', userRole);
    if (userRole !== 'parent') {
      navigate('/');
    }

    const fetchAppointments = async () => {
      try {
        const response = await api.get('/api/appointments');
        const events = response.data.map((appt) => ({
          id: appt.appointment_id,
          title: `Appointment for Child with Specialist ${appt.specialist_id}`,
          start: new Date(appt.date_time),
          end: new Date(new Date(appt.date_time).getTime() + appt.duration * 60000),
        }));
        setAppointments(events);
      } catch (err) {
        setError('Failed to fetch appointments: ' + (err.response?.data?.message || err.message));
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleMedicalHistoryChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory({
      ...medicalHistory,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId'); // Parent's ID, representing the child
      const payload = {
        ...formData,
        patient_id: userId, // Parent ID acts as the patient's ID for simplicity
        parent_id: userId,  // Same as patient_id since it's a parent representing the child
      };
      await api.post('/appointments', payload);
      alert('Appointment booked successfully!');
      const response = await api.get('/appointments');
      const events = response.data.map((appt) => ({
        id: appt.appointment_id,
        title: `Appointment for Child with Specialist ${appt.specialist_id}`,
        start: new Date(appt.date_time),
        end: new Date(new Date(appt.date_time).getTime() + appt.duration * 60000),
      }));
      setAppointments(events);
    } catch (err) {
      setError('Failed to book appointment: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleMedicalHistorySubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId'); // Parent's ID for the child's history
      const payload = {
        ...medicalHistory,
        patient_id: userId,
      };
      await api.post('/medical-history', payload);
      alert('Medical history submitted successfully!');
    } catch (err) {
      setError('Failed to submit medical history: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Parent Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Appointment Booking Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment for Your Child</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Specialist ID</label>
            <input
              type="number"
              name="specialist_id"
              value={formData.specialist_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date & Time</label>
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
            <label className="block text-gray-700 mb-2">Duration (minutes)</label>
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
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_fast_track"
                checked={formData.is_fast_track}
                onChange={handleChange}
                className="mr-2"
              />
              Fast Track
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Book Appointment
          </button>
        </form>
      </div>

      {/* Medical History Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Submit Medical History for Your Child</h2>
        <form onSubmit={handleMedicalHistorySubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Diagnosis (e.g., dyslexia, ADHD)</label>
            <input
              type="text"
              name="diagnosis"
              value={medicalHistory.diagnosis}
              onChange={handleMedicalHistoryChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Symptoms</label>
            <textarea
              name="symptoms"
              value={medicalHistory.symptoms}
              onChange={handleMedicalHistoryChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Previous Treatments</label>
            <textarea
              name="previous_treatments"
              value={medicalHistory.previous_treatments}
              onChange={handleMedicalHistoryChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Learning Difficulty Details</label>
            <textarea
              name="learning_difficulty_details"
              value={medicalHistory.learning_difficulty_details}
              onChange={handleMedicalHistoryChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Family History</label>
            <textarea
              name="family_history"
              value={medicalHistory.family_history}
              onChange={handleMedicalHistoryChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Medical History
          </button>
        </form>
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Child's Appointments</h2>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default ParentDashboard;