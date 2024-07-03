const express = require('express');
const Transaction = require('../../models/Transaction');
const router = express.Router();

// Route to get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
