const express = require('express');
const router = express.Router();
const {dailySalesReport} = require('../controllers/salesController');

// Define route to generate daily sales report
router.get('/daily-sales-report', dailySalesReport);

module.exports = router;
