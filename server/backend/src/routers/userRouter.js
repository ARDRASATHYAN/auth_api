const express = require('express');
const { userSignup, login, ForgetPassword, verifyuser, Resetpassword } = require('../controllers/userController');
const router = express.Router();

// Register&login route
router.post('/register',userSignup)
router.post('/login',login)
router.post('/forgetpassword',ForgetPassword)
router.get("/reset-password/:id/:token",verifyuser)
router.post("/reset-password/:id/:token",Resetpassword)



module.exports = router;
