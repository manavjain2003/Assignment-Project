const express = require('express');
const router = express.Router();
const { login , register , getUsers} = require('../controllers/user.controller');
const {apiprotectionMiddleware } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/getusers', apiprotectionMiddleware, getUsers);

module.exports = router;