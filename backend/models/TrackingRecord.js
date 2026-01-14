const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phone: String,
  status: {
    type: String,
    enum: ['Pending', 'Shipped', 'In Transit', 'In Ghana', 'Delivered'],
    default: 'Pending'
  },
  location: String,
  destination: String,
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TrackingRecord', trackingSchema);