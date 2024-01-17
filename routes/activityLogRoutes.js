const express = require('express');
const router = express.Router();
const {
    createLog,
    getLogs,
    getLogById
} = require('../controller/activityLogController');

router.post('/', createLog);
router.get('/', getLogs);
router.get('/:id', getLogById);

module.exports = router;