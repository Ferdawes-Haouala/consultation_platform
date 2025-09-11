import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (isLoggedIn) {
        try {
          const response = await api.get('/users/me');
          setUserRole(response.data.role.toLowerCase());
        } catch (err) {
          console.error('Error fetching role:', err.response?.status, err.response?.data);
          localStorage.removeItem('token');
          setUserRole(null);
          navigate('/login');
        }
      }
    };
    fetchUserRole();
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setUserRole(null);
    navigate('/login');
  };

  return (
    <div className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          {isLoggedIn && userRole === 'parent' && (
            <>
              <Link to="/parent" className="mr-4">Parent Dashboard</Link>
              <Link to="/calendar" className="mr-4">View Calendar</Link>
              <Link to="/chat" className="mr-4">Chat</Link>
            </>
          )}
          {isLoggedIn && (userRole === 'doctor' || userRole === 'specialist') && (
            <>
              <Link to="/specialist" className="mr-4">Specialist Dashboard</Link>
              <Link to="/chat" className="mr-4">Chat</Link>
            </>
          )}
          {isLoggedIn && userRole === 'admin' && (
            <>
              <Link to="/admin" className="mr-4">Admin Dashboard</Link>
              <Link to="/chat" className="mr-4">Chat</Link>
            </>
          )}
        </div>
        <div>
          {isLoggedIn && userRole === 'admin' && (
            <Link to="/training" className="mr-4">Training Dashboard</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="mr-4 text-white hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="mr-4">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;