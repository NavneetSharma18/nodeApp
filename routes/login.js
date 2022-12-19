const express                     = require('express');
const { check, validationResult } = require('express-validator');
const passport                    = require('passport');
const LocalStrategy               = require('passport-local').Strategy;
const session                     = require('express-session');
const bcrypt                      = require('bcrypt');
const saltRounds                  = 10;
const router                      = express.Router();

const {registerView, loginView, registerUser,validateUser,logoutUser} = require('../controllers/loginController');
// Load model
const User                        = require('../models/user');




/*--------------------------------------------
| Register functionality start from here
---------------------------------------------*/


router.get('/register', registerView);
router.post('/register',[
    
    check('name', 'Name length should be 3 to 20 characters')
                    .isLength({ min: 3, max: 20 }),
    check('email', 'Email can`t be blank and should be valid email')
                    .isEmail(),
    check('confirm', 'Confirm length should be atleast 3  characters')
                    .isLength({ min: 3}),
    check('password', 'Password length should be atleast 3 characters')
                    .isLength({ min: 3 })
                    .custom((val, { req, loc, path }) => {
                                if (val !== req.body.confirm) {
                                    throw new Error("Passwords and confirm password don't match");
                                } else {
                                    return true;
                                }
                            })
],registerUser);


/*--------------------------------------------
| Login functionality start from here
---------------------------------------------*/

router.get('/', loginView);


// Configure Sessions Middleware

router.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));



/*------------------------------------------------
| Passport Js Authentication local-strategy Start
-------------------------------------------------*/ 

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(

  function(username, password, done) {
    
    password = bcrypt.hashSync(password, saltRounds);
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.password == password) { return done(null, false); }
      return done(null, user);
    });
  }
  
));

passport.serializeUser((user,done) =>{
    // session store only user id so that rest ino of user is ignored due to wastage of memory
    if(user){
        return done(null,user.id)
    }
    return done(null,false)

});

passport.deserializeUser((id,done) =>{

    User.findById(id,(err,user)=>{
        if(err) return done(null,false);
        return done(null,user)

    })
    
})

/*------------------------------------------------
| Passport Js END
-------------------------------------------------*/ 


router.post('/login', 
  passport.authenticate('local'),
  validateUser
);

router.post('/logout', 
  logoutUser
);

logoutUser


module.exports = router;