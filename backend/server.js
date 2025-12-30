const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-vercel-app.vercel.app'  // Replace this with your actual Vercel frontend URL
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman or curl)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
