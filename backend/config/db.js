const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://alimsayyad9786_db_user:J7v6mLrul3xpPMiR@linkgenerate.lt4iiyy.mongodb.net/LinkGenerate?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('MongoDB connection error:', err);
    }
    process.exit(1);
  }
};

module.exports = connectDB;