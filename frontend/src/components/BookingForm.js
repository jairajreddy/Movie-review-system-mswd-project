import React, { useState } from 'react';
import { bookTicket } from '../api/api';
import { useAuth } from '../context/AuthContext';

const BookingForm = ({ movieId }) => {
  const { isAuthenticated } = useAuth();
  const [booking, setBooking] = useState({ seats: 1, showtime: '', totalPrice: 0 });

  const handleSeatsChange = (e) => {
    const seats = parseInt(e.target.value);
    const totalPrice = seats * 150; // Assuming $10 per seat
    setBooking({ ...booking, seats, totalPrice });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please sign in to book tickets');
      return;
    }
    try {
      await bookTicket({ ...booking, movie: movieId });
      alert('Booking successful!');
      setBooking({ seats: 1, showtime: '', totalPrice: 10 });
    } catch (error) {
      alert('Error booking ticket');
    }
  };

  return (
    <div className="booking-form">
      <h3>Book Tickets</h3>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            placeholder="Number of seats"
            value={booking.seats}
            onChange={handleSeatsChange}
            required
          />
          <input
            type="datetime-local"
            placeholder="Showtime"
            value={booking.showtime}
            onChange={(e) => setBooking({ ...booking, showtime: e.target.value })}
            required
          />
          <p>Total Price: ₹{booking.totalPrice}</p>
          <button type="submit">Book Now</button>
        </form>
      ) : (
        <p>Please <a href="/signin">sign in</a> to book tickets.</p>
      )}
    </div>
  );
};

export default BookingForm;
