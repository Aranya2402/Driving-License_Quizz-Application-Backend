const ActivityLog = require('../../models/ActivityLog');
// const jwt = require('jsonwebtoken');

const getUserId = (req) => {
  // const token = req.headers.authorization;
  // Assume some logic to decode the token and extract the user ID
  // const decodedToken = jwt.verify(token, 'your_jwt_secret');
  return '1002';
};

// Route for user login
exports.login = (req, res) => {
  const userId = getUserId(req);

  const activityLog = new ActivityLog({
    userId,
    action: 'User logged in',
    type: 'online',
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

  ActivityLog.findOne({ userId, type: 'online' }).sort({ timestamp: -1 })
    .then((loginActivity) => {
      if (loginActivity) {
        loginActivity.action = 'User logged out';
        loginActivity.type = 'offline';
        loginActivity.timestamp = new Date(); // Update timestamp for logout action
        
        loginActivity.save()
          .then(() => {
            res.send('User logged out successfully');
          })
          .catch((error) => {
            console.error('Error logging user out:', error);
            res.status(500).send('Error logging user out: ' + error.message);
          });
      } else {
        res.status(404).send('No online activity found for the user');
      }
    })
    .catch((error) => {
      console.error('Error finding online activity:', error);
      res.status(500).send('Error finding online activity: ' + error.message);
    });
};

// Route for user attempting action
exports.attempting = (req, res) => {
  const userId = getUserId(req);

  const activityLog = new ActivityLog({
    userId,
    action: 'User attempting',
    type: 'attempting',
  });

  activityLog.save()
    .then(() => {
      res.send('User attempting recorded successfully');
    })
    .catch((error) => {
      console.error('Error recording user attempting:', error);
      res.status(500).send('Error recording user attempting: ' + error.message);
    });
};

module.exports = {
  login: exports.login,
  logout: exports.logout,
  attempting: exports.attempting,
};
