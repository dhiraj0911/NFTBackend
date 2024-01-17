const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    nftId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Asset",
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionDate: {
        type: Date,
        default: Date.now
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;