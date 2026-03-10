const express = require('express');
const router = express.Router();
const { login , register , getUsers} = require('../controllers/user.controller');
const {apiprotectionMiddleware , adminProtectionMiddleware} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/getusers', apiprotectionMiddleware, adminProtectionMiddleware, getUsers);

module.exports = router;