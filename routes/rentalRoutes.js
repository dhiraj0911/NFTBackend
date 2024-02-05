const express = require('express');
const router = express.Router();
const {
    createRental,
    getRentals,
    getRentalById,
    updateRental,
    deleteRental,
    getActiveRentals,
    getExpiredRentals,
    updateExpiredRentalsStatus
} = require('../controller/rentalController');

router.post('/', createRental);
router.get('/', getRentals);
router.get('/:id', getRentalById);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);
router.get('/active', getActiveRentals);
router.get('/expired', getExpiredRentals);
router.get('/update', updateExpiredRentalsStatus);

module.exports = router;