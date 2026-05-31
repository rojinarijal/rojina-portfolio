const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/submit', async (req, res) => {
  try {
    const newEntry = new Contact(req.body);
    await newEntry.save();
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;