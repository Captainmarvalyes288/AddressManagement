
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['home', 'office', 'family']
  },
  location: {
    lat: Number,
    lng: Number
  },
  address: String,
  notes: String,
  isFavorite: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);