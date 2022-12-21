const express           = require('express');
const dotenv            = require('dotenv');
const flash             = require('connect-flash');
const {isAuthenticated} = require('./auth/auth.js');
const mongoose          = require('mongoose');
const passport          = require('passport');
const session           = require('express-session');
const bcrypt            = require('bcrypt');
const app               = express();
require('./auth/passport')(passport);





mongoose.set("strictQuery", false);
app.use(express.urlencoded({extended: false}));




/*--------------------------------------------
| Setting of session 
---------------------------------------------*/

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));



app.use(flash());


/*--------------------------------------------
| Setting of global error message 
---------------------------------------------*/

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  next();
});



/*------------------------------------------------
| Passport Js Authentication local-strategy Start
-------------------------------------------------*/ 

app.use(passport.initialize());
app.use(passport.session());



/*------------------------------------------
| Config the Env variables
--------------------------------------------*/

dotenv.config();
const PORT    = process.env.PORT;



/*------------------------------------------
| Setting the View engine
--------------------------------------------*/


app.set('view engine', 'ejs');




/*------------------------------------------
| Connecting to mongo DB
--------------------------------------------*/


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


/*----------------------------------------------------------
| Setting the Routes based on user and admin authentication
-----------------------------------------------------------*/

app.use('/', require('./routes/login'));
app.use('/admin',isAuthenticated, require('./routes/admin'));

app.listen(PORT).on('error', function (err) {
        if(err.errno === 'EADDRINUSE') {
            console.log(`----- Port ${PORT} is busy, trying with port ${PORT + 1} -----`);
            listen(PORT + 1)
        } else {
            console.log(err);
        }
    });