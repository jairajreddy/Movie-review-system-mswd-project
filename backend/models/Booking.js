const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seats: { type: Number, required: true },
  showtime: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);