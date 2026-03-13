const express = require('express');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const auth = require('../middleware/auth');

const router = express.Router();

// Get bookings for user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ renter: req.user.id }).populate('property');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking (renter only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'renter') return res.status(403).json({ message: 'Access denied' });

  const { propertyId, checkIn, checkOut } = req.body;
  try {
    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (!property.available) return res.status(400).json({ message: 'Property not available' });

    const days = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    const totalPrice = days * property.price;

    const booking = new Booking({
      property: propertyId,
      renter: req.user.id,
      checkIn,
      checkOut,
      totalPrice,
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('property');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.property.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    const { status } = req.body;
    booking.status = status || booking.status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;