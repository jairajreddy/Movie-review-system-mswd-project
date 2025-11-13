import React from 'react';

const MovieDetails = ({ movie }) => {
  if (!movie) return <div>Loading movie details...</div>;

  return (
    <div className="movie-details">
      {movie.poster && <img src={movie.poster} alt={movie.title} className="movie-detail-poster" />}
      <h2>{movie.title}</h2>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Release Year:</strong> {movie.releaseYear}</p>
      <p><strong>Description:</strong> {movie.description}</p>
      <p><strong>Rating:</strong> {movie.rating}/10</p>
    </div>
  );
};

export default MovieDetails;
