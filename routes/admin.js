const express               = require('express');
const {dashboardView }      = require('../controllers/adminController');
const router                = express.Router();




/*--------------------------------------------
| Admin dashboard routes
---------------------------------------------*/

router.get('/dashboard', dashboardView);


module.exports = router;