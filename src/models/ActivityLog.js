// models/activityLog.js

const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    default:null,
  },
  logoutTime: {
    type: Date,
    default:null,

  },
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
