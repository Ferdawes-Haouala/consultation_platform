const express = require('express');
  const router = express.Router();
  const axios = require('axios');
  const { authenticateToken } = require('../middleware/authMiddleware');

  // Fetch courses and enrolled users from Moodle
  router.get('/courses', authenticateToken, async (req, res) => {
    try {
      const user = await require('../models/User').findById(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      const moodleToken = process.env.MOODLE_TOKEN;
      if (!moodleToken) {
        return res.status(500).json({ message: 'Moodle token not configured. Please set MOODLE_TOKEN in .env' });
      }

      const moodleUrl = 'http://localhost:8080/moodle/webservice/rest/server.php';
      const params = new URLSearchParams({
        wstoken: moodleToken,
        wsfunction: 'core_course_get_courses',
        moodlewsrestformat: 'json',
      }).toString();

      const courseResponse = await axios.get(`${moodleUrl}?${params}`).catch((err) => {
        throw new Error(`Failed to connect to Moodle: ${err.response?.data?.message || err.message}`);
      });

      const courses = courseResponse.data;
      if (courses && courses.length > 0) {
        const enrolResponse = await axios.get(`${moodleUrl}?${new URLSearchParams({
          wstoken: moodleToken,
          wsfunction: 'core_enrol_get_enrolled_users',
          moodlewsrestformat: 'json',
          courseid: courses[0].id,
        }).toString()}`).catch((err) => {
          throw new Error(`Failed to fetch enrolled users: ${err.response?.data?.message || err.message}`);
        });
        const enrolledUsers = enrolResponse.data;
        res.json({ courses, enrolledUsers });
      } else {
        res.json({ courses: [], enrolledUsers: [] });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch training data', error: err.message });
    }
  });

  module.exports = router;