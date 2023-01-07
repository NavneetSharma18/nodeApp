const express                                = require('express');
const flash                                  = require('connect-flash');
const fileUpload                             = require('express-fileupload');
const { check, validationResult }            = require('express-validator');
const {dashboardView,uploadView,uploadPost } = require('../controllers/adminController');
const router                                 = express.Router();



router.use(flash());


/*--------------------------------------------
| Setting of global error message 
---------------------------------------------*/

router.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  next();
});


/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.get('/dashboard', dashboardView);


router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get('/upload', uploadView);
router.post('/upload',[
    check('uploadfile', 'Please select file')
], uploadPost);


module.exports = router;