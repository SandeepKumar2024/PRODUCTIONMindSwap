const express = require('express');
const { signupController, loginController, logoutController, forgotPasswordController, resetPasswordController } = require('../../controllers/Auth/AuthController');
const router = express.Router();




router.post('/login',loginController);
router.post('/signup',signupController);
router.get('/logout',logoutController);
router.post('/forgot',forgotPasswordController);
router.post('/reset/:id',resetPasswordController);


module.exports = router;    