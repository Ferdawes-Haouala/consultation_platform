const express = require('express');
   const router = express.Router();
   const Appointment = require('../models/Appointment');

   router.get('/', async (req, res) => {
     try {
       const appointments = await Appointment.find();
       res.json(appointments);
     } catch (err) {
       res.status(500).json({ message: 'Error fetching appointments', error: err.message });
     }
   });

   router.post('/book', async (req, res) => {
     try {
       const { patient_id, specialist_id, date_time, duration, description, parent_id, is_fast_track } = req.body;
       const appointment = new Appointment({
         appointment_id: Date.now(),
         patient_id,
         specialist_id,
         date_time,
         duration,
         description,
         parent_id,
         is_fast_track,
       });
       await appointment.save();
       res.status(201).json({ message: 'Appointment booked successfully', appointment });
     } catch (err) {
       res.status(400).json({ message: 'Error booking appointment', error: err.message });
     }
   });

   router.put('/:id/status', async (req, res) => {
     try {
       const { status } = req.body;
       const appointment = await Appointment.findOneAndUpdate(
         { appointment_id: req.params.id },
         { status },
         { new: true }
       );
       if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
       res.json({ message: 'Status updated', appointment });
     } catch (err) {
       res.status(400).json({ message: 'Error updating status', error: err.message });
     }
   });

   router.get('/:id', async (req, res) => {
     try {
       const appointment = await Appointment.findOne({ appointment_id: req.params.id });
       if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
       res.json(appointment);
     } catch (err) {
       res.status(500).json({ message: 'Error fetching appointment', error: err.message });
     }
   });

   module.exports = router;