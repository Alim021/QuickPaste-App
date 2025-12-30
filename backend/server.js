const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for React app running on port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import routes
const pasteRoutes = require('./routes/pasteRoutes');

// Use routes with '/api' prefix
app.use('/api', pasteRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Pastebin API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
