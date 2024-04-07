const express = require('express');
const mongoose = require('mongoose');

// Exam Schema
const examSchema = new mongoose.Schema({

    title: String,
    image: String,
    description: String,
    rangeStart: Number,
    rangeEnd: Number,

  }, { collection: 'Easy'});

  const Exam = mongoose.model('Exam', examSchema);

  module.exports = Exam;