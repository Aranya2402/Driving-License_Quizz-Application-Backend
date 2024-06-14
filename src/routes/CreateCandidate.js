const express = require('express');
const router = express.Router();
const CandidateSchema = require('../models/Candidate');

// Save attempted quiz data
router.post('/', async (req, res) => {
    try {
        const candidate = new CandidateSchema({
            name:  req.body.name,
            email: req.body.email           
        });        
        const savedCandidate = await candidate.save();

        res.status(201).json(savedCandidate);
    } catch (err) {        
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;


// {
//     "name": "Lehaananth",
//     "email": "lehaan@gmail.com"
//   }