const { Question } = require('../models/models.js');
const multer = require('multer');
const { commentSchema } = require('../validation/validation.js')
const express = require('express');
const router = express.Router();

// specifying multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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

// display a single post and it's comments
router.get('/:id', function(req, res) {
    Question.findOne({ _id: req.params.id })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            // log the error in a log file

            // send the error message
            res.json({ "Error": error });
        })
});


// another attempt



// posting comments
router.put('/comment/:id', async function(req, res) {
    try {
        const result = await commentSchema.validateAsync(req.body);
        try {
            var question = await Question.findOne({ _id: req.params.id })
            question.comment.push(result.comment);
            try {
                question = await question.save();
                console.log(question);
            } catch (err) {
                // log the error in a log file

                // send error message
                res.json({ "Error": err });
            }

        } catch (e) {
            // log the error in a log file

            // send error message
            res.json({ "Error" : e });
        }
    }
    catch (error) {
        // log the error in a log file

        // send the error message
        res.json({ "Error" : error });
    }
})


// posting questions, can only be done by users

router.post('/postquery', upload.array('files', 12), async function(req, res) {
    /**
     * Check if are any images attached to the post
     * if there are no images, then just post the text content
     * otherwise, add images to the post object
     */
    var post = {};  // will add post variables here
    if (req.files) {
        post[files] = req.files
    }
    // post the question
    try {
        post['textContent'] = req.body.textContent;
        post['author'] = 'Author'; // replace this with the name of current user when done testing
        var question = new Question({
            post
        });
        question = await question.save();
        res.json({ "Success" : "Your query has been submitted!" }); // maybe using flash message is better
    }
    catch (error) {
        // log the error in a log file

        // send the error message
        res.json({ "Error" : error });
    }


});



/*
router.get('/test', (req, res) => {
    var obj = {};
    var name = 'Aashab';
    obj["nicknam"] = name;
    res.send(obj);
})

*/
module.exports = router;