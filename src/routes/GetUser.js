const express = require('express');
const router = express.Router();
const {User} = require("../models/User")

// Save attempted quiz data
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
    
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

module.exports = router;
