import React, { useState } from 'react';
   import { useNavigate } from 'react-router-dom';
   import api from '../api';

   const Signup = () => {
     const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
     const [error, setError] = useState('');
     const navigate = useNavigate();

     const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         await api.post('/auth/register', formData);
         navigate('/login');
       } catch (err) {
         setError('Signup failed: ' + err.response?.data?.message || err.message);
       }
     };

     return (
       <div className="min-h-screen flex items-center justify-center p-6">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
           <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
           {error && <div className="text-red-500 text-center mb-4">{error}</div>}
           <form onSubmit={handleSubmit}>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
               <input
                 type="text"
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
               <input
                 type="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
               <input
                 type="password"
                 name="password"
                 value={formData.password}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
               <select
                 name="role"
                 value={formData.role}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
               >
                 <option value="patient">Patient</option>
                 <option value="parent">Parent</option>
                 <option value="doctor">Doctor</option>
                 <option value="admin">Admin</option>
               </select>
             </div>
             <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Sign Up</button>
           </form>
         </div>
       </div>
     );
   };

   export default Signup;