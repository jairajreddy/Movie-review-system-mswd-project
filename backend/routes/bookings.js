const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movie');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET bookings for a specific user
router.get('/user/:user', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.user }).populate('movie');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('movie');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create booking
router.post('/', auth, async (req, res) => {
  const booking = new Booking({
    ...req.body,
    user: req.user._id
  });
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update booking
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;