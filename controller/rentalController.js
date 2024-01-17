const Rental = require('../models/rental');

// Create a new rental
const createRental = async (req, res) => {
    try {
        const newRental = new Rental(req.body);
        await newRental.save();
        res.status(201).json(newRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all rentals
const getRentals = async (req, res) => {
    try {
        const rentals = await Rental.find().populate('nftId renter');
        res.json(rentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single rental by ID
const getRentalById = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id).populate('nftId renter');
        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }
        res.json(rental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a rental
const updateRental = async (req, res) => {
    try {
        const updatedRental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRental);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a rental
const deleteRental = async (req, res) => {
    try {
        await Rental.findByIdAndDelete(req.params.id);
        res.json({ message: 'Rental deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get active rentals
const getActiveRentals = async (req, res) => {
    try {
        const currentDate = new Date();
        const activeRentals = await Rental.find({ 
            rentEndDate: { $gte: currentDate } // Greater than or equal to current date
        }).populate('nftId renter');
        res.json(activeRentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get expired rentals
const getExpiredRentals = async (req, res) => {
    try {
        const currentDate = new Date();
        const expiredRentals = await Rental.find({ 
            rentEndDate: { $lt: currentDate } // Less than current date
        }).populate('nftId renter');
        res.json(expiredRentals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createRental,
    getRentals,
    getRentalById,
    updateRental,
    deleteRental,
    getActiveRentals,
    getExpiredRentals
};
