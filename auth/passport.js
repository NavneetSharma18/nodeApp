const bcrypt                      = require('bcrypt');
const saltRounds                  = 10;
const md5                         = require('md5');
const passport                    = require('passport');
const LocalStrategy               = require('passport-local').Strategy;
const User                        = require('../models/user');

module.exports = function(passport) {

    passport.use(new LocalStrategy(

      function(username, password, done) {

        if(!username || !password){ return done(null, false, {message: "username and password can't be blank" }); }
        
         User.findOne({ email: username }, function (err, user) {

          if (err) { return done(null,false,{ message: err }) }

          if (!user) { return done(null, false,{ message: 'That email is not registered' }); }
        
          if (user.password.toString() != md5(md5(password).toString()) ) { return done(null, false,{ message: 'Incorrect password' }); }

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

}
