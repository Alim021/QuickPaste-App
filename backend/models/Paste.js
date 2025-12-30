const mongoose = require('mongoose');

const pasteSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  content: { type: String, required: true },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Paste', pasteSchema);