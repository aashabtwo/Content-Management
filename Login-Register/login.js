const { authSchema } = require('../validation/validation.js');
const { User } = require('../models/models.js');
const bcrypt = require('bcrypt');
const express = require('express');
const e = require('express');
const router = express.Router();

// find a way to limit the number of times a user tries to authenticate


// log in a user
router.post('/', async (req, res) => {
    // validate body
    try {
        const authResult = await authSchema.validateAsync(req.body);
        // destructure
        const { email, password } = authResult;
        
        // find if there is a user with this email
        User.findOne({ email: email })
         .then(user => {
             if (!user) {
                // attach a cookie and return no user found message
                // if a cookie already exists, increase its count
                
                // check if a cookie exists
                var cookie = req.cookies.counter;
                if (cookie == undefined) {
                    // no cookies exsit, assign cookies
                    var counter = 0
                    res.cookie('counter', counter, { maxAge: 30*24*60*60*1000, httpOnly: true });
                    res.json({ "Error": "No user of this email has been found" });
                }
                else {
                    // counter cookie exists, so increasing its count
                    counter += 1;
                    res.cookie('counter', counter, {maxAge:30*24*60*60*1000, httpOnly: true });
                    res.json({ "Error": "No user of this email has beend found" });
                }
             }
             else {
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                     if (isMatch) {
                        // authorize the user
                     }
                     else {
                        // the password did not match
                        // attach a cookie, if a cookie already exists, increase its count
                     }
                 })
             }
         })
         .catch()    
    }
    catch (error) {
        // log the error in a log file
        res.json({ "Error": error })
    }
})


module.exports = router;