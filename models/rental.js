const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Asset',
        required: true
    },
    renter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    rentPrice: {
        type: Number,
        required: true
    },
    rentStartDate: {
        type: Date,
        required: true
    },
    rentEndDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Rental = mongoose.model('Rental', rentalSchema);
module.exports = Rental;