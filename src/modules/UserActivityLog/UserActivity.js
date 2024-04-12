// UserActivityLog/userActivity.js

const mongoose = require('mongoose');
const ActivityLog = require('../../models/ActivityLog'); 


// Route for user login
exports.login = (req, res) => {
  
  const getUserId = (req) => {
    // Implement this function to extract user ID from the request( request type paathu)ithu paakkanum
  };
  
  const userId = getUserId(req);
  
  
  const activityLog = new ActivityLog({
    userId,
    action: 'User logged in',
    type: 'login',
    loginTime: new Date().toLocaleTimeString(),
  });
  
  // Save the activity log entry
  activityLog.save()
    .then(() => {
      res.send('User logged in successfully');
    })
    .catch((error) => {
      console.error('Error logging user in:', error);
      res.status(500).send('Error logging user in');
    });
};


// Route for user logout

exports.logout = (req, res) => {
  
  const getUserId = (req) => {
    // Implement this function to extract user ID from the request same goes here also request type 
  };
  
  const userId = getUserId(req);
  // Find the most recent login activity update pandrathukku
  
  ActivityLog.findOne({ userId, type: 'login' }).sort({ timestamp: -1 })
    .then((loginActivity) => {
      if (loginActivity) {
        // Update the login activity with logout time
        
        loginActivity.logoutTime = new Date().toLocaleTimeString();
        loginActivity.save()
          .then(() => {
            res.send('User logged out successfully');
          })
          .catch((error) => {
            console.error('Error logging user out:', error);
            res.status(500).send('Error logging user out');
          });
      } else {
        res.status(404).send('No login activity found for the user');
      }
    })
    .catch((error) => {
      console.error('Error finding login activity:', error);
      res.status(500).send('Error finding login activity');
    });
};
  




  // Route for retrieving exams attempted by a user
exports.getAttemptedExams = (req, res) => {
    
    const getUserId = (req) => {
      // Implement this function to extract user ID from the request ,store pannathu request body laya,request parameters ah or, request headers ah
    };
    const userId = getUserId(req);
    
    // Find all activity log entries of type 'examAttempt' for the given user ID
    ActivityLog.find({ userId, type: 'examAttempt' })
      .populate('examId') // Populate the 'examId' field with exam details
      .then((attemptedExams) => {
        res.json(attemptedExams);
      })
      .catch((error) => {
        console.error('Error retrieving attempted exams:', error);
        res.status(500).send('Error retrieving attempted exams');
      });
  };
  
  
  
  module.exports = {
    login: exports.login,
    logout: exports.logout,
    startExam: exports.startExam,
    getAttemptedExams: exports.getAttemptedExams,
    ActivityLog,
  };