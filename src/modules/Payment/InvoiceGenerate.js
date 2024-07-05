const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../../models/Transaction');

async function getTransactionByUserId(userId) {
    try {
      const objectId = mongoose.Types.ObjectId(userId);
      
      const transaction = await Transaction.findOne({ 'userDetails.id': objectId });
  
      if (!transaction) {
        return null;
      }
  
      return transaction;
    } catch (error) {
      throw error;
    }
  }

module.exports = {getTransactionByUserId};