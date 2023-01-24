const express = require('express');
const { Review, User, ReviewImage, Spot, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;

    const review = await Review.findAll({
        where: { userId:user },
        include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'price', [sequelize.literal(
                    `(SELECT url
                    FROM SpotImages
                    WHERE spotId = Spot.id AND preview = true)`
                ), "previewImage"]]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    res.json(review)
});

module.exports = router;
