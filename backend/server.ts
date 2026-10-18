const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const aiRoutes = require('./routes/aiRoutes');

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('🚗 Carpooling API is running!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
