const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/Movie');

const sampleMovies = [
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    releaseYear: 2010,
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    rating: 8.8,
    reviews: []
  },
  {
    title: 'The Dark Knight',
    genre: 'Action',
    director: 'Christopher Nolan',
    releaseYear: 2008,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    reviews: []
  },
  {
    title: 'Interstellar',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    releaseYear: 2014,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    rating: 8.6,
    reviews: []
  },
  {
    title: 'Pulp Fiction',
    genre: 'Crime',
    director: 'Quentin Tarantino',
    releaseYear: 1994,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    rating: 8.9,
    reviews: []
  },
  {
    title: 'They Call Him OG',
    genre: 'Action',
    director: 'Sujeeth',
    releaseYear: 2025,
    description: 'a Telugu action film set in the 1990s, centered on the return of a powerful gangster named Ojas Gambheera (OG) to Mumbai to protect his allies and the city from warring factions.',
    poster: 'https://media.themoviedb.org/t/p/w188_and_h282_bestv2/yHyvS4OMq8oij11Co9CbeMqLUo2.jpg', // Replace with actual poster URL if available
    rating: 7.5,
    reviews: []
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Movie.deleteMany(); // Clear existing movies
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies added successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();