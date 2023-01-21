const express = require('express');
const { Spot, User, Review, SpotImage, sequelize } = require('./../../db/models')
const { requireAuth } = require('./../../utils/auth')
const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            },
            {
                model: SpotImage
            }
        ]
    });

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.preview = image.url
            }
            delete spot.SpotImages
        })
    });

    res.json(spotsList);
});

// Get All Spots Owned/Created by the Current User.
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = Spot.findAll({
    });
    res.json(currentUserSpots)
});

// Get details of a Spot from an Id
router.get('/:spotId', async (req, res) => {
    const spotDetails = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (spotDetails) {
        res.json(spotDetails)
    } else {
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})




module.exports = router;


// worked on the wrong one

// include: [
//     {
//         model: SpotImage,
//         attributes: { exclude: ['spotId', 'createdAt', 'updatedAt'] }
//     },
//     {
//         model: User,
//         attributes: { exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt'] }
//     }
// ]
