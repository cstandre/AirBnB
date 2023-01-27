const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { SpotImage, Spot } = require('../../db/models');
const router = express.Router();


// Delete a spot image    <-- Completed 
router.delete('/:imageId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const spotImg = await SpotImage.findByPk(req.params.imageId);

    if (!spotImg) {
        res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    };

    const spot = await Spot.findOne({
        where: { id: spotImg.spotId }
    })

    if (spotImg && user === spot.ownerId) {
        await spotImg.destroy();
        res.json({
            "message": "Sucessfully deleted",
            "statusCode": 200
        })
    };
})

module.exports = router;
