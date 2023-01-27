const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Booking, Spot } = require('../../db/models');
const router = express.Router();


// Get all 'current user' bookings // almost complete. Spot is at bottom instead of right under spotId
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
            where: {userId: user},
            include: {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price']
            }
        })

    res.json(bookings);
})

// Edit a booking
router.put('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
    const { startDate, endDate } = req.body;
    const updatedBooking = await Booking.findByPk(req.params.bookingId);

    if (updatedBooking && user === updatedBooking.userId) {
        if (startDate) updatedBooking.startDate = startDate
        if (endDate) updatedBooking.endDate = endDate

        updatedBooking.save()
        res.json(updatedBooking)
    } else {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 403
        })
    }
});

// Delete a booking  <-- completed 
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
    const booking = await Booking.findByPk(req.params.bookingId)

    if (booking && user === booking.userId) {
        await booking.destroy();
        res.json({
            "message": "Successfully Deleted",
            "statusCode": 200
        })
    } else {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
});


module.exports = router;
