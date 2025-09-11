import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const SpecialistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    console.log('User Role:', userRole);

    if (userRole !== 'doctor') {
      navigate('/'); // Redirect if not a doctor
    }

    const fetchData = async () => {
      try {
        const response = await api.get('/api/appointments');
        setAppointments(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch appointments: ' + (err.response?.data?.message || err.message));
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Specialist Dashboard</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Appointment ID</th>
                <th className="border p-2">Patient ID</th>
                <th className="border p-2">Date & Time</th>
                <th className="border p-2">Duration (min)</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointment_id}>
                  <td className="border p-2">{appointment.appointment_id}</td>
                  <td className="border p-2">{appointment.patient_id}</td>
                  <td className="border p-2">{new Date(appointment.date_time).toLocaleString()}</td>
                  <td className="border p-2">{appointment.duration}</td>
                  <td className="border p-2">{appointment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SpecialistDashboard;