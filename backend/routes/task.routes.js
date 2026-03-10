const express = require('express');
const router = express.Router();
const {createTask , getTasks , updateTaskStatus} = require('../controllers/task.controller');
const {apiprotectionMiddleware } = require('../middleware/auth');

router.post('/createtask',  apiprotectionMiddleware, createTask);
router.get('/gettasks', apiprotectionMiddleware, getTasks);
router.put('/tasks/:id/status', apiprotectionMiddleware, updateTaskStatus);

module.exports = router;