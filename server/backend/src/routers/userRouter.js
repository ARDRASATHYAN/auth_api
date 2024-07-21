const express = require('express');
const { userSignup, login } = require('../controllers/userController');
const router = express.Router();

// Register&login route
router.post('/register',userSignup)
router.post('/login',login)


module.exports = router;
