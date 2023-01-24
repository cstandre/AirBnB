const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { Booking, Spot } = require('../../db/models');
const router = express.Router();


// Get all 'current user' bookings
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
            where: {userid: user}
        })

    res.json(bookings);
})



module.exports = router;
