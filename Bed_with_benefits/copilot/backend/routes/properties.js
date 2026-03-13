const express = require('express');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get property by id
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create property (owner only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'owner') return res.status(403).json({ message: 'Access denied' });

  const { title, description, location, price, images } = req.body;
  try {
    const property = new Property({
      title,
      description,
      location,
      price,
      images,
      owner: req.user.id,
    });
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update property (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    const { title, description, location, price, images, available } = req.body;
    property.title = title || property.title;
    property.description = description || property.description;
    property.location = location || property.location;
    property.price = price || property.price;
    property.images = images || property.images;
    property.available = available !== undefined ? available : property.available;

    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete property (owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;