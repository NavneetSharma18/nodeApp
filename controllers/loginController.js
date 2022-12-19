const { check, validationResult } = require('express-validator');
const bcrypt                      = require('bcrypt');
const saltRounds                  = 10;
const passport                    = require('passport');
const LocalStrategy               = require('passport-local');
const flash                       = require('connect-flash');

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


const validateUser = (req, res) =>{
    
    return res.redirect('/admin/dashboard');
    
}



/*-------------------------------------------------------
| Post register request 
---------------------------------------------------------*/


const registerUser = (req, res) =>{

    
        const errors = validationResult(req);
     
        if (!errors.isEmpty()) {    

            const alert = errors.array();

            console.log(alert);

            res.render('register',{
                alert
            });
        }
        else {

                const userReq       = req.body;
                const insertUser    = new User(userReq);
                insertUser.password = bcrypt.hashSync(userReq.password, saltRounds);

                insertUser.save().then(data => {

                     const success =[{
                                "value": '',
                                "msg"  : 'User register successfully !',
                                "param": 'savingModel'
                        }];

                        res.redirect('/');

                }).catch( err =>{

                        const alert =[{
                                "value": '',
                                "msg"  : err,
                                "param": 'savingModel'
                        }];

                        res.render('register',{
                          alert
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