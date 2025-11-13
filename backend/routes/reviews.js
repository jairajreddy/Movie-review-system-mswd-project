const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../middleware/auth');

// GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('movie');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET reviews for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('movie').populate('user', '_id name');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('movie');
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create review
router.post('/', auth, async (req, res) => {
  const review = new Review({
    ...req.body,
    user: req.user._id
  });
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update review
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to edit this review' });
    }
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;