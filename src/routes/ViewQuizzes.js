const express = require('express');
const router = express.Router();
const Quizzes = require("../models/Quiz")

router.get('/', async (req, res) => {
    try {
        const quizSet = await Quizzes.find()
            .populate({
                path: 'questions',
                populate: [
                    {
                        path: 'answers'
                    }
                ]
            })
          
        res.send(quizSet);
    
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

module.exports = router;
