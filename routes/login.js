const express                     = require('express');
const flash                       = require('connect-flash');
const { check, validationResult } = require('express-validator');
const passport                    = require('passport');
const session                     = require('express-session');
const saltRounds                  = 10;
const router                      = express.Router();

const {registerView, loginView, registerUser,validateUser,logoutUser} = require('../controllers/loginController');
const User                        = require('../models/user');







/*-----------------------------------------------------
| ****** Login Register Routes Start from here ******
-------------------------------------------------------*/


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


router.post("/login", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

router.post('/logout', 
  logoutUser
);



module.exports = router;