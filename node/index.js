const express = require('express');
const dotenv  = require('dotenv');
const app     = express();

dotenv.config();

const PORT    = process.env.PORT;

// set view engine

app.set('view engine', 'ejs');

//use rotes

app.use('/', require('./routes/login'));
app.use('/admin', require('./routes/admin'));

app.listen(PORT, console.log("Server don start for port: " + PORT))