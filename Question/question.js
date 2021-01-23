const { Question } = require('../models/models.js')
const express = require('express');
const router = express.Router();

// display all questions and answers, available for everyone
router.get('/', function(req, res) {
    Question.find()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json({ "Error": error });
        })
});



module.exports = router;