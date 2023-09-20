const express = require('express');
const { Review, User, ReviewImage, Spot, SpotImage, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateReview = [
    check('review')
    .exists()
    .withMessage('Review text is required'),
    check('stars')
    .exists()
    .isNumeric({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Get All Reviews for Current User <-- Completed
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user.id;

    const userReview = await Review.findAll({
        where: { userId: user },
        include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: {model: SpotImage}
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    userReview.forEach(review => {
        const spotImages = review.dataValues.Spot.SpotImages
        spotImages.forEach(image => {
            if (image.dataValues.preview) {
                review.dataValues.Spot.dataValues.previewImage = image.url
            } else {
                review.dataValues.Spot.dataValues.previewImage = null
            }
        })
        delete review.dataValues.Spot.dataValues.SpotImages;
    })

    res.json({Reviews: userReview})
});


// Add image based on the Review's id <-- Completed
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const user = req.user.id;
    const { url } = req.body;
    const review = await Review.findByPk(req.params.reviewId);

    if (review && user === review.userId) {
        const reviewId = review.id

        const newImage = await ReviewImage.create({
            url: url,
            reviewId: reviewId
        })
        const newImgId = newImage.id;

        const reviewImg = await ReviewImage.findByPk(newImgId, {
            attributes: ['id', 'url']
        })

        res.json(reviewImg);
    }else {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
});

// Edit a review  <-- Completed
router.put('/:reviewId', requireAuth, validateReview, async(req, res) => {
    const user = req.user.id;
    const { review, stars } = req.body;
    const updatedReview = await Review.findByPk(req.params.reviewId);

    if (updatedReview && user === updatedReview.userId) {
        if (review) updatedReview.review = review;
        if (stars) updatedReview.stars = stars;

        updatedReview.save();
        res.json(updatedReview)
    } else {
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
});


// Delete a review  <-- Completed
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const user = req.user.id;
    const review = await Review.findByPk(req.params.reviewId);

    if (review && user === review.userId) {
        await review.destroy();
        res.json(review)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        });
    } else {
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    };
})

module.exports = router;
