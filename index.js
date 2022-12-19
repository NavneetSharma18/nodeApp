const express           = require('express');
const dotenv            = require('dotenv');
const flash             = require('connect-flash');
const {isAuthenticated} = require('./auth/auth.js');
const mongoose          = require('mongoose');

mongoose.set("strictQuery", false);
const app        = express();

app.use(express.urlencoded({extended: false}));


dotenv.config();

const PORT    = process.env.PORT;

// set view engine

app.set('view engine', 'ejs');


// connecting to db


mongoose
  .connect('mongodb+srv://root:root@cluster0.m7nltbc.mongodb.net/natours?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


//use rotes

app.use('/', require('./routes/login'));
app.use('/admin',isAuthenticated, require('./routes/admin'));

app.listen(PORT, console.log("Server don start for port: " + PORT))