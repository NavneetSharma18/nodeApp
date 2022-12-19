const express               = require('express');
const {dashboardView }      = require('../controllers/adminController');
const router                = express.Router();
router.get('/dashboard', dashboardView);
module.exports = router;