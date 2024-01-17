const ActivityLog = require('../models/activityLog');

const createLog = async (req, res) => {
    try {
        const newLog = new ActivityLog(req.body);
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().populate('userId');
        res.json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getLogById = async (req, res) => {
    try {
        const log = await ActivityLog.findById(req.params.id).populate('userId');
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.json(log);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createLog,
    getLogs,
    getLogById
};
