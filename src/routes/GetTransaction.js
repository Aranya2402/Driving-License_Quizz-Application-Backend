const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: 'Invalid userId format' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    
    const transaction = await Transaction.findOne({ 'userDetails.id': objectId });

    if (transaction) {
      res.json(transaction);
    } else {
      return res.status(404).send({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).send({ message: 'Error fetching transaction', error: error.message });
  }
});

module.exports = router;
