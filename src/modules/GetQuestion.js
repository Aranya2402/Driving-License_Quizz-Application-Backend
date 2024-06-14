const mongoose = require('mongoose');

// Import the defined question and answer schemas
const Question = require('./questionSchema');
const Answer = require('./answerSchema');

// Function to retrieve questions with populated answers
async function getQuestions() {
  try {
    // Populate the 'answers' field with the corresponding Answer documents
    const questions = await Question.find().populate('answers');
    return questions;
  } catch (error) {
    console.error('Error retrieving questions:', error.message);
    throw error; // Re-throw the error for proper handling
  }
}

