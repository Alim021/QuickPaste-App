const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration - ALLOW YOUR VERCEL DOMAIN
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://quick-paste-app-gk57.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

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
  res.json({ 
    message: 'Pastebin API is running',
    status: 'online',
    timestamp: new Date().toISOString(),
    allowedOrigins: ['http://localhost:3000', 'https://quick-paste-app-gk57.vercel.app']
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));