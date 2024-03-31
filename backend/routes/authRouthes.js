const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/approve-registration', authController.approveRegistration);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;
