const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

require('dotenv').config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));