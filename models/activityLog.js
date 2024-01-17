const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    activityType: {
        type: String,
        required: true
    },
    activityDetails: {
        type: String
    },
    activityDate: {
        type: Date,
        default: Date.now
    }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;