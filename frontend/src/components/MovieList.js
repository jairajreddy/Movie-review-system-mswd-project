import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../api/api';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies();
      setMovies(data);
      setLoading(false);
    };
    loadMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;

  return (
    <div className="movie-list">
      <h2>Available Movies</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card">
            {movie.poster && <img src={movie.poster} alt={movie.title} className="movie-poster" />}
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <Link to={`/movie/${movie._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
