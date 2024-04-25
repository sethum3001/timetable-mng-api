const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/auth.controllers');;

router.post('/refresh-token', refreshTokenController.refreshToken);

module.exports = router;
 