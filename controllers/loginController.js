const { check, validationResult } = require('express-validator');
const bcrypt                      = require('bcrypt');
const saltRounds                  = 10;
const passport                    = require('passport');
const LocalStrategy               = require('passport-local');
const flash                       = require('connect-flash');
const md5                         = require('md5');

// Load model
const User                        = require('../models/user');





/*-------------------------------------------------------
| Load register view 
---------------------------------------------------------*/


const registerView = (req, res) => {

        res.render("register");
}



/*-------------------------------------------------------
| Load Login view 
---------------------------------------------------------*/


const loginView = (req, res) => {

    res.render("login", {
    } );
}


/*---------------------------------------------------------
| Validate User via login
---------------------------------------------------------*/


const validateUser =  (req, res) => {

  res.redirect('/admin/dashboard'); 
}


/*-------------------------------------------------------
| Post register request 
---------------------------------------------------------*/


const registerUser = (req, res) =>{

        
        const validError  = validationResult(req);
        const errors      = validError.array();

        
        if (errors.length > 0) {    
            console.log(errors);
            res.render('register',{
                errors
            });
        }
        else {
                const errors        = [];
                const userReq       = req.body;
                const insertUser    = new User(userReq);
                insertUser.password = md5(md5('dj@123'));

                insertUser.save().then(data => {

                  req.flash('success_msg','You are now registered and can log in');
                  res.redirect('register');

                }).catch( err =>{
                        console.log(err)
                        errors.push(err);

                        res.render('register',{
                          errors
                        });
                    
                });
        }
   
}


/*------------------------------------------------------
| Logout user
-------------------------------------------------------*/

const logoutUser = (req,res,next) =>{
    req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
   });
}




/*-------------------------------------------------------
| Export model
---------------------------------------------------------*/




module.exports =  {
    registerView,
    loginView,
    registerUser,
    validateUser,
    logoutUser,
};