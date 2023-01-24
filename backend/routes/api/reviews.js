const express = require('express');
const { Review, User, ReviewImage, Spot, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Get All Reviews for Current User <-- Completed
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;

    const userReview = await Review.findAll({
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

    res.json(userReview)
});


//Almost done - can't figure out why the else isn't working

// Get All Reviews by a Spot's id
// router.get('/spots/:spotId', async(req, res) => {
//     const spotReview = await Review.findAll({
//         where: { spotId: req.params.spotId },
//         include: [
//             { model: User, attributes: ['id', 'firstName', 'lastName'] },
//             { model: ReviewImage, attributes: ['id', 'url'] },
//         ]
//     });

//     if (spotReview) {
//         res.json(spotReview)
//     } else {
//         res.status(404).json({
//             "message": "Spot couldn't be found",
//             "statusCode": 404
//         })
//     }
// });


// Create a Review for a Spot based on the spot's id
// router.post('/spots/:spotId', requireAuth, async (req, res) => {
//     const { review, stars } = req.body;
//     const user = req.user.id

//     const newReview = await Review.create(
//         {
//             userId: user,
//             spotId: req.params.spotId,
//             review: review,
//             stars: stars
//         }
//     )
//     res.status(201).json(newReview)
// })

module.exports = router;
