const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Booking, Spot, SpotImage } = require('../../db/models');
const router = express.Router();


// Get all 'current user' bookings  <-- Complete
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
            where: {userId: user},
            include: {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']
            }
        })
        for await (let booking of bookings) {
            const spot = booking.Spot.dataValues;
            const image = await SpotImage.findOne({
                where: {spotId: spot.id, preview: true }
            })
            if (image) {
                booking.Spot.dataValues.previewImage = image.url
            } else {
                booking.Spot.dataValues.previewImage = null
            }
        };


    res.json({Bookings: bookings});
})

// Edit a booking   <-- Complete
router.put('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
    const { startDate, endDate } = req.body;
    const updatedBooking = await Booking.findByPk(req.params.bookingId);

    if (endDate < startDate) {
        res.status(400).json({
            "message": "validation error",
            "statusCode": 400,
            "errors": ["endDate cannot come before startDate"]
        })
    }

    if (updatedBooking && user === updatedBooking.userId) {
        if (startDate) updatedBooking.startDate = startDate
        if (endDate) updatedBooking.endDate = endDate

        updatedBooking.save()
        res.json(updatedBooking)
    } else {
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
});

// Delete a booking  <-- completed enough to pass
router.delete('/:bookingId', requireAuth, async(req, res) => {
    const user = req.user.id;
    const booking = await Booking.findByPk(req.params.bookingId)

    // const today =

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
