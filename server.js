require('dotenv').config()
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const registerRouter = require('./Login-Register/register.js');
const loginRouter = require('./Login-Register/login.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cookieParser());
app.use(helmet());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000, () => { console.log('Mongodb connected; Server is listening on Port 3000')}))
    .catch((err) => console.log(err))

app.use(express.json())
app.use('/api/register', isloggedIn, registerRouter);
app.use('/api/login', isloggedIn, loginRouter);


// profile route
app.get('/profile', cookieCheck, authCheck, (req, res) => {
    res.send(req.user);
})

/*
// create a logout route here
app.delete('/logout', (req, res) => {
    res.writeHead(200, {
        "Set-Cookie": `token=${token}; HttpOnly; expires=${new Date(new Date().getTime()+0 * 60000).toUTCString()}`,
        "Access-Control-Allow-Credentials": "true"
    }).send()
});
*/

// MIDDLEWARES

// middlware to check cookies
function cookieCheck (req, res, next) {
    if (req.cookies.token == undefined) {
        // action to take for absence of cookies
        res.sendStatus(403);
    }
    else {
        next();
    }
}

// middleware to authorize
function authCheck(req, res, next) {
    jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        else {
            req.user = user;
            next();
        }
    })
}

// middlware for login check
function isloggedIn(req, res, next) {
    if (!req.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}