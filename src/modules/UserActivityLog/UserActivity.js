const mongoose = require('mongoose');
const ActivityLog = require('../../models/ActivityLog'); 

const getUserId = (req) => {
  const token = req.headers.authorization;
  // Assume some logic to decode the token and extract the user ID
  const decodedToken = jwt.verify(token, 'your_jwt_secret');
  return decodedToken.userId;
};

// Route for user login
exports.login = (req, res) => {
  const userId = getUserId(req);
  
  const activityLog = new ActivityLog({
    userId,
    action: 'User logged in',
    type: 'login',
    loginTime: new Date(),
  });

  activityLog.save()
    .then(() => {
      res.send('User logged in successfully');
    })
    .catch((error) => {
      console.error('Error logging user in:', error);
      res.status(500).send('Error logging user in: ' + error.message);
    });
};

// Route for user logout
exports.logout = (req, res) => {
  const userId = getUserId(req);

  ActivityLog.findOne({ userId, type: 'login' }).sort({ timestamp: -1 })
    .then((loginActivity) => {
      if (loginActivity) {
        loginActivity.logoutTime = new Date();
        loginActivity.save()
          .then(() => {
            res.send('User logged out successfully');
          })
          .catch((error) => {
            console.error('Error logging user out:', error);
            res.status(500).send('Error logging user out: ' + error.message);
          });
      } else {
        res.status(404).send('No login activity found for the user');
      }
    })
    .catch((error) => {
      console.error('Error finding login activity:', error);
      res.status(500).send('Error finding login activity: ' + error.message);
    });
};

// Route for retrieving exams attempted by a user
exports.getAttemptedExams = (req, res) => {
  const userId = getUserId(req);

  ActivityLog.find({ userId, type: 'examAttempt' })
    .populate('examId')
    .then((attemptedExams) => {
      res.json(attemptedExams);
    })
    .catch((error) => {
      console.error('Error retrieving attempted exams:', error);
      res.status(500).send('Error retrieving attempted exams: ' + error.message);
    });
};

module.exports = {
  login: exports.login,
  logout: exports.logout,
  getAttemptedExams: exports.getAttemptedExams,
};
