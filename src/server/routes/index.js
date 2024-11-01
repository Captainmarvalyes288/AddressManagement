
const express = require('express');
const router = express.Router();
const Location = require('../models/Location');
const { validateLocation } = require('../middleware/validation');

router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find().sort('-createdAt');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/locations', validateLocation, async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/locations/:id', validateLocation, async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/locations/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;