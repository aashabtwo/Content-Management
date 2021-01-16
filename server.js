require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000, () => { console.log('Mongodb connected; Server is listening')}))
    .catch((err) => console.log(err))



