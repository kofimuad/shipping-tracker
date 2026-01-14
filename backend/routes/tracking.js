const express = require('express');
const { auth } = require('../middleware/auth');
const TrackingRecord = require('../models/TrackingRecord');

const router = express.Router();

// Get all tracking records for employee
router.get('/', auth, async (req, res) => {
  try {
    let records;
    if (req.userRole === 'employee') {
      records = await TrackingRecord.find().populate('userId', 'email phone');
    } else {
      records = await TrackingRecord.find({ userId: req.userId });
    }
    res.json({ success: true, data: records });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Search tracking by number
router.get('/search/:trackingNumber', auth, async (req, res) => {
  try {
    const record = await TrackingRecord.findOne({
      trackingNumber: req.params.trackingNumber.toUpperCase()
    });

    if (!record) {
      return res.status(404).json({ success: false, message: 'Tracking not found' });
    }

    // Check authorization for customers
    if (req.userRole === 'customer' && record.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create or update tracking record
router.post('/', auth, async (req, res) => {
  try {
    const { trackingNumber, status, location, destination, phone } = req.body;

    let record = await TrackingRecord.findOne({ trackingNumber });

    if (record) {
      record.status = status || record.status;
      record.location = location || record.location;
      record.destination = destination || record.destination;
      record.lastUpdated = Date.now();
    } else {
      record = new TrackingRecord({
        trackingNumber,
        userId: req.userId,
        phone,
        status,
        location,
        destination
      });
    }

    await record.save();
    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete tracking record
router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await TrackingRecord.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Record deleted', data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;