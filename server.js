require('dotenv').config()
const mongoose = require('mongoose');
const helmet = require('helmet');
const registerRouter = require('./Login-Register/register.js');
const express = require('express');
const app = express();


app.use(helmet());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000, () => { console.log('Mongodb connected; Server is listening')}))
    .catch((err) => console.log(err))

app.use(express.json())
app.use('/api/register', registerRouter);



