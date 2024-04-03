const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateUser } = require('../utils/authorize')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/approve-registration/:id/:option', authController.approveRegistration);
router.post('/refresh-token', authController.refreshToken);
router.put('/update-working-hours', authenticateUser, authController.updateWorkingHours);

module.exports = router;
