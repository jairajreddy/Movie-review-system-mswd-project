import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if backend is on different port

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export const fetchMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
};

export const fetchReviews = async (movieId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const submitReview = async (movieId, review) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, {
      movie: movieId,
      rating: review.rating,
      comment: review.comment
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};

export const updateReview = async (reviewId, review) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/reviews/${reviewId}`, {
      rating: review.rating,
      comment: review.comment
    });
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const bookTicket = async (booking) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, {
      movie: booking.movie,
      seats: booking.seats,
      showtime: new Date(booking.showtime),
      totalPrice: booking.totalPrice
    });
    return response.data;
  } catch (error) {
    console.error('Error booking ticket:', error);
    throw error;
  }
};
