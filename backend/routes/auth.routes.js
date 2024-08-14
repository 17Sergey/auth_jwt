const express = require('express');
const path = require('path');
const { signUp, login, logout, getMe } = require('../controllers/auth.controllers.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/signup2', signUp);

router.post('/login2', login);

router.post('/logout2', logout);

router.get('/me2', verifyToken, getMe);

module.exports = router;
