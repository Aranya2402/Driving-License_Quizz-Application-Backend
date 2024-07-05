const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  amountTotal: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cardLast4: {
    type: String,
    default: null
  },
  userDetails: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    // Add other user details as needed
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
