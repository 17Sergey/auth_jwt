const express = require('express');

const { refreshToken } = require('../controllers/refreshTokenController.js');
const verifyToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/', refreshToken);

module.exports = router;
