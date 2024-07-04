// routes/activityLogs.js

const express = require('express');
const ActivityLog = require('../../models/ActivityLog');
const router = express.Router();

// POST route to create a new activity log

router.post('/logs', async (req, res) => {
  const { userId, loginTime, logoutTime } = req.body;

  try {
    const newActivityLog = new ActivityLog({
      userId,
      loginTime,
      logoutTime,
    });

    await newActivityLog.save();
    res.status(201).json(newActivityLog);
  } catch (err) {
    console.error('Error creating activity log:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/logs', async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find();
    res.status(200).json(activityLogs);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
