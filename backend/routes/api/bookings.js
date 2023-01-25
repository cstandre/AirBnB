const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Booking } = require('../../db/models');
const router = express.Router();


// Get all 'current user' bookings
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
            where: {userId: user}
        })

    res.json(bookings);
})

// Edit a booking
router.get('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
});

// Delete a booking
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
});


module.exports = router;
