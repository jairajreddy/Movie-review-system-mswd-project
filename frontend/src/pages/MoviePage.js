import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import ReviewSection from '../components/ReviewSection';
import BookingForm from '../components/BookingForm';
import { fetchMovieById, fetchReviews } from '../api/api';

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      const movieData = await fetchMovieById(id);
      const reviewsData = await fetchReviews(id);
      setMovie(movieData);
      setReviews(reviewsData);
      setLoading(false);
    };
    loadMovie();
  }, [id]);

  if (loading) return <div>Loading movie...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-page">
      <MovieDetails movie={movie} />
      <ReviewSection movieId={id} reviews={reviews} onReviewSubmit={() => {
        fetchReviews(id).then(setReviews);
      }} />
      <BookingForm movieId={id} />
    </div>
  );
};

export default MoviePage;
