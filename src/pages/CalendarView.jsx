import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../api';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get('/api/appointments');
        const appointments = response.data.map((appointment) => ({
          title: `Appointment with Specialist ID: ${appointment.specialist_id}`,
          start: new Date(appointment.date_time),
          end: new Date(new Date(appointment.date_time).getTime() + appointment.duration * 60000),
        }));
        setEvents(appointments);
      } catch (err) {
        setError('Failed to fetch appointments: ' + err.message);
      }
    };
    fetchAppointments();
  }, []);

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Appointments Calendar</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
        <button
          onClick={() => navigate('/book-appointment')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Book New Appointment
        </button>
      </div>
    </div>
  );
};

export default CalendarView;