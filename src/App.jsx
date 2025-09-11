import React from 'react';
   import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
   import Navbar from './components/Navbar';
   import Home from './pages/Home';
   import ParentDashboard from './pages/ParentDashboard';
   import SpecialistDashboard from './pages/SpecialistDashboard';
   import AdminDashboard from './pages/AdminDashboard';
   import TrainingDashboard from './pages/TrainingDashboard';
   import BookAppointment from './pages/BookAppointment';
   import CalendarView from './pages/CalendarView';
   import Chat from './components/Chat';
   import Login from './pages/Login';

   const App = () => {
     return (
       <Router>
         <Navbar />
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/login" element={<Login />} />
           <Route path="/parent" element={<ParentDashboard />} />
           <Route path="/specialist" element={<SpecialistDashboard />} />
           <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/training" element={<TrainingDashboard />} />
           <Route path="/book-appointment" element={<BookAppointment />} />
           <Route path="/calendar" element={<CalendarView />} />
           <Route path="/chat" element={<Chat />} />
         </Routes>
       </Router>
     );
   };

   export default App;