const express = require('express');
const router = express.Router();
const eventLogsController = require('../controllers/eventLogsController');

router.post('/', eventLogsController.create);

module.exports = router;