const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    trim: true 
  },
  views: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    expires: 604800 // Auto delete after 7 days (optional)
  }
}, {
  // Disable version key
  versionKey: false
});

// Create index for faster queries
pasteSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Paste', pasteSchema);