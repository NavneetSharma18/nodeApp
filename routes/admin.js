const express                                = require('express');
const flash                                  = require('connect-flash');
const fileUpload                             = require('express-fileupload');
const { check, validationResult }            = require('express-validator');
const {dashboardView,uploadView,uploadPost } = require('../controllers/adminController');
const router                                 = express.Router();



/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.get('/dashboard', dashboardView);


router.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

router.get('/upload', uploadView);
router.post('/upload', uploadPost);


module.exports = router;