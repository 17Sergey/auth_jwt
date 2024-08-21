const express = require('express');
const path = require('path');
const { signUp, login, logout, getMe } = require('../controllers/auth.controllers.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.post('/signup', signUp);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', verifyToken, getMe);

module.exports = router;
