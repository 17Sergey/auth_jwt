const express = require('express');
const path = require('path');
const { getUserProfile } = require('../controllers/profile.controllers.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/:username', verifyToken, getUserProfile);

module.exports = router;
