// models/activityLog.js

const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['login', 'logout', 'examAttempt'],
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  loginTime: {
    type: String,
  },
  logoutTime: {
    type: String,
  },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
