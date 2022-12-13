const express = require('express');
const { check, validationResult } = require('express-validator');
const {registerView, loginView, registerUser} = require('../controllers/loginController');
const router = express.Router();

router.get('/register', registerView);
router.post('/register',[
    
    check('name', 'Name length should be 3 to 20 characters')
                    .isLength({ min: 3, max: 20 }),
    check('email', 'Email can`t be blank and should be valid email')
                    .isEmail(),
    check('confirm', 'Confirm length should be 3 to 10 characters')
                    .isLength({ min: 3, max: 10 }),
    check('password', 'Password length should be 3 to 10 characters')
                    .isLength({ min: 3, max: 10 })
                    .custom((val, { req, loc, path }) => {
                                if (val !== req.body.confirm) {
                                    throw new Error("Passwords and confirm password don't match");
                                } else {
                                    return true;
                                }
                            })
],registerUser);

router.get('/login', loginView);

module.exports = router;