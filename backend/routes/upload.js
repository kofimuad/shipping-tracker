const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const { auth, employeeOnly } = require('../middleware/auth');
const TrackingRecord = require('../models/TrackingRecord');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/excel', auth, employeeOnly, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const { columnMapping } = req.body;
    const records = [];

    for (let row of data) {
      const trackingNumber = row[columnMapping.tracking];
      if (!trackingNumber) continue;

      const record = {
        trackingNumber: trackingNumber.toString(),
        userId: req.userId,
        phone: row[columnMapping.userId],
        status: row[columnMapping.status] || 'Pending',
        location: row[columnMapping.location] || 'Unknown',
        destination: 'TBD'
      };

      let existingRecord = await TrackingRecord.findOne({ 
        trackingNumber: record.trackingNumber 
      });

      if (existingRecord) {
        Object.assign(existingRecord, record);
        await existingRecord.save();
      } else {
        const newRecord = new TrackingRecord(record);
        await newRecord.save();
      }

      records.push(record);
    }

    res.json({ 
      success: true, 
      message: `Uploaded ${records.length} records`,
      data: records 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;