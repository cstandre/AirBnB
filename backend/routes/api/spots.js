const express = require('express');
const { Spot, User, Review, SpotImage, sequelize } = require('./../../db/models')
const { requireAuth } = require('./../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('./../../utils/validation')
const router = express.Router();

const validateSpot = [
    check('address')
    .exists()
    .withMessage('Street address is required'),
    check('city')
    .exists()
    .withMessage('City is required'),
    check('state')
    .exists()
    .withMessage('State is required'),
    check('country')
    .exists()
    .withMessage('Country is required'),
    check('lat')
    .exists() // decimal??
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists() // decimal??
    .withMessage('Longitude is not valid'),
    check('name')
    .exists()
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .exists()
    .withMessage('Description is required'),
    check('price')
    .exists()
    .withMessage('Price per day is required'),
    handleValidationErrors
  ];

// Get All Spots     <-- Completed *would like to add something if rating or preview spot is null and preview = false
router.get('/', async (req, res) => {
    const spotsList = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.literal(
                    `(SELECT AVG(stars)
                    FROM Reviews
                    WHERE spotId = Spot.id)`
                ), "avgRating"],
                [sequelize.literal(
                    `(SELECT url
                    FROM SpotImages
                    WHERE spotId = Spot.id AND preview = true)`
                ), "previewImage"]
            ]
        }
    });

    res.json(spotsList);
});

// Get All Spots Owned/Created by the Current User. <-- completed. Would like to add something if rating or preview img is null and preview = false
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        attributes: {
            include: [
                [sequelize.literal(
                    `(SELECT AVG(stars)
                    FROM Reviews
                    WHERE spotId = Spot.id)`
                ), "avgRating"],
                [sequelize.literal(
                    `(SELECT url
                    FROM SpotImages
                    WHERE spotId = Spot.id AND preview = true)`
                ), "previewImage"]
            ]
        },
    });

    res.json(currentUserSpots)
});

// Get details of a Spot from an Id <-- completed *add something for if a review is null
router.get('/:spotId', async (req, res) => {
    const spotDetails = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [sequelize.literal(
                    `(SELECT COUNT(*)
                    FROM Reviews)`
                ), "numReviews"],
                [sequelize.literal(
                    `(SELECT AVG(stars)
                    FROM Reviews
                    WHERE spotId = Spot.id)`
                ), "avgRating"],
            ],
        },
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
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});

// When I don't put anything into the body, then it sends the expected output for the validation errors. When I input all required data points expect one, I get "title: 'Bad request.'", "errors": ["Invalid Value"]

// Create a Spot  <-- completed
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const newSpot = await Spot.create(
        {
            ownerId: req.user.id,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            lat: req.body.lat,
            lng: req.body.lng,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        }
    )

    res.status(201).json(newSpot)
});


// Add an Image to a Spot based on the Spot's id <-- completed
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const user = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId);

    const { url, preview } = req.body

    if (spot && user === spot.ownerId) {
        const spotId = spot.id

        const newImage = await SpotImage.create({
            url: url,
            preview: preview,
            spotId: spotId
        })
        const newImgId = newImage.id

        const spotImage = await SpotImage.findByPk(newImgId, {
            attributes: ['id', 'url', 'preview']
        })

        res.json(spotImage);
    } else {
        res.status(404).json({
            "message": "Spot could not be found",
            "statusCode": 404
        })
    }

});

// Edit a spot <-- completed
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const user = req.user.id
    const updatedSpot = await Spot.findByPk(req.params.spotId)

    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    if (updatedSpot && user === updatedSpot.ownerId) {
        if (address) updatedSpot.address = address;
        if (city) updatedSpot.city = city;
        if (state) updatedSpot.state = state;
        if (country) updatedSpot.country = country;
        if (lat) updatedSpot.lat = lat;
        if (lng) updatedSpot.lng = lng;
        if (name) updatedSpot.name = name;
        if (description) updatedSpot.description = description;
        if (price) updatedSpot.price = price;

        updatedSpot.save()
        res.json(updatedSpot)
    } else {
        res.status(404).json({
            "message": "Spot could not be found",
            "statusCode": 404
        })
    }

});

// Delete a spot       <-- completed
router.delete('/:spotId', requireAuth, async (req, res) => {
    const user = req.user.id
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot && user === spot.ownerId) {
        await spot.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});


module.exports = router;
