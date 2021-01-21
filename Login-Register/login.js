require('dotenv').config();
const { authSchema } = require('../validation/validation.js');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models.js');
const bcrypt = require('bcrypt');
const express = require('express');
const e = require('express');
const router = express.Router();

router.get('/', function(req, res)  {
    res.send(req.cookies.token);
})

/**
 * WARNING!! NO REQUEST LIMITER HAS BEEN ADDED!!!!
 * 
 */

// log in a user
router.post('/', async (req, res) => {
    // validate body
    try {
        const authResult = await authSchema.validateAsync(req.body);
        // destructure validated request (which is the authResult)
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
                    //var counter = 0
                    //res.cookie('counter', counter, { maxAge: 30*24*60*60*1000, httpOnly: true });
                    res.json({ "Error": "No user of this email has been found" });
                }
                else {
                    // counter cookie exists, so increasing its count
                    //counter += 1;
                    //res.cookie('counter', counter, {maxAge:30*24*60*60*1000, httpOnly: true });
                    res.json({ "Error": "No user of this email has beend found" });
                }
             }
             else {
                 bcrypt.compare(password, user.password, (err, isMatch) => {
                     if (isMatch) {
                        // email and password matched
                        // delete the counter cookie, if there is any
                        // var counter = req.cookies.counter;
                        // if (counter != undefined) {
                        //     // clear the 'counter' cookie
                        //     res.clearCookie('counter');
                        // }
                        // proceed to authorization
                        // take the name, email, firstName and LastName and id 
                        // and store them in an object
                        // the use that object to sign the token
                        const userToken = { name: user.firstName, email: user.email, _id: user._id };
                        // now sign the token and authorize
                        const token = jwt.sign(userToken, process.env.TOKEN_SECRET, { expiresIn: '604800s' });
                        // now store the token in a cookie
                        res.cookie('token', token, { maxAge: 60*1000, httpOnly: true })
                        .send('cookies set');
                        // should redirect to home


                     }
                     else {
                        // the password did not match
                        res.json({"Error": "Password did not match!"});
                        
                        // attach a cookie, if a cookie already exists, increase its count


                        /*
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

                        */
                     }
                 })
             }
         })
         .catch((err) => {
            // log the error in a specific log file

            // send the error message
            res.json({ "Error": err });
         })    
    }
    catch (error) {
        // log the error in a log file

        // send the error messaeg
        res.json({ "Error": error })
    }
})


module.exports = router;