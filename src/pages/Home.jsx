import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <img
        src="/images/logo.jpg"
        alt="Bahja Clinic Logo"
        className="w-32 h-32 mb-6"
      />


      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Bahja Clinic</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Your trusted platform for mental health and learning difficulty consultations.
        Book appointments, manage your sessions, and connect with specialists seamlessly.
      </p>

            {/* Consultation Platform Image 
      <img
        src="/images/consultation-platform.png"
        alt="Consultation Platform"
        className="w-64 h-64 mb-6"
      />
            */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;