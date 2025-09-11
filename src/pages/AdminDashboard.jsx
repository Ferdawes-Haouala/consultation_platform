import React, { useState, useEffect } from 'react';
  import api from '../api';
  import { useNavigate } from 'react-router-dom';

  const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [chatLogs, setChatLogs] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const userRole = localStorage.getItem('role');
      if (userRole !== 'admin') {
        navigate('/');
      }

      const fetchData = async () => {
        try {
          const apptResponse = await api.get('/api/appointments');
          setAppointments(apptResponse.data);
          const usersResponse = await api.get('/api/users');
          setUsers(usersResponse.data);
          const chatResponse = await api.get('/api/chat-logs');
          setChatLogs(chatResponse.data);
        } catch (err) {
          setError('Failed to fetch data: ' + (err.response?.data?.message || err.message));
        }
      };

      fetchData();
    }, [navigate]);

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Appointments Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Appointment ID</th>
                  <th className="border p-2">Patient ID</th>
                  <th className="border p-2">Specialist ID</th>
                  <th className="border p-2">Date & Time</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td className="border p-2">{appointment.appointment_id}</td>
                    <td className="border p-2">{appointment.patient_id}</td>
                    <td className="border p-2">{appointment.specialist_id}</td>
                    <td className="border p-2">{new Date(appointment.date_time).toLocaleString()}</td>
                    <td className="border p-2">{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">User ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2">{user.id}</td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Chat Logs Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Chat Logs</h2>
          {chatLogs.length === 0 ? (
            <p>No chat logs found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">User ID</th>
                  <th className="border p-2">Room</th>
                  <th className="border p-2">Message</th>
                  <th className="border p-2">User</th>
                  <th className="border p-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {chatLogs.map((log) => (
                  <tr key={log._id}>
                    <td className="border p-2">{log.userId}</td>
                    <td className="border p-2">{log.room}</td>
                    <td className="border p-2">{log.text}</td>
                    <td className="border p-2">{log.user}</td>
                    <td className="border p-2">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  export default AdminDashboard;