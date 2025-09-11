import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const TrainingDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await api.get('/users/me');
        setUserRole(response.data.role.toLowerCase());
        if (response.data.role.toLowerCase() !== 'admin') {
          navigate('/');
        }
      } catch (err) {
        setError('Failed to fetch user data: ' + err.message);
        navigate('/login');
      }
    };
    fetchUserRole();
  }, [navigate]);

  useEffect(() => {
    if (userRole === 'admin') {
      const fetchData = async () => {
        try {
          const response = await api.get('/api/training/courses');
          setCourses(response.data.courses || []);
          setEnrolledUsers(response.data.enrolledUsers || []);
        } catch (err) {
          setError('Failed to fetch data: ' + err.message);
        }
      };
      fetchData();
    }
  }, [userRole]);

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Training Dashboard</h1>
        {courses.length > 0 ? (
          <ul className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {courses.map((course) => (
              <li key={course.id} className="py-2 border-b last:border-b-0">
                {course.fullname} - Enrolled Students: {enrolledUsers.length || 'Loading...'}
                <ul>
                  {enrolledUsers.map((user) => (
                    <li key={user.id}>{user.fullname}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default TrainingDashboard;