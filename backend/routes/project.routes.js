const express = require('express');
const router = express.Router();
const { createProject , getProjects } = require('../controllers/project.controller');
const {apiprotectionMiddleware , adminProtectionMiddleware} = require('../middleware/auth');

router.post('/createProject', apiprotectionMiddleware, adminProtectionMiddleware, createProject);
router.get('/getProjects', apiprotectionMiddleware , getProjects);

module.exports = router;