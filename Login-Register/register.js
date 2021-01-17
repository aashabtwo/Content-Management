const { registerSchema } = require('../validation/validation.js');
const bcrypt = require('bcrypt');
const { User } = require('../models/models.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
    // validate request body
    const result = await registerSchema.validateAsync(req.body);
    // check if the email is a kuet one
    const isKuetEmail = result.email.includes("@stud.kuet.ac.bd")
    if (!isKuetEmail) {
        res.json({"Error": "Not Kuet Email"});
    }
    else {
        // destructuring request body
        const{ firstName,lastName,email,password,confirmPassword,department,roll,batch } = result;
        
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // now save it to database
        var user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            department,
            roll,
            batch
        });
        user = await user.save();
        console.log(user);


    }
    
    

    }
    catch(e) {
        // log this to a file
        
        // send the error message to the client
        res.json({"error": e});
    }
    
})

module.exports = router;