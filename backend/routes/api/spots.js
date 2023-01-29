const express = require('express');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('./../../db/models')
const { requireAuth } = require('./../../utils/auth')
const { check } = require('express-validator')
const { handleValidationErrors } = require('./../../utils/validation');


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
    .exists()
    .isDecimal()
    .withMessage('Latitude is not valid'),
    check('lng')
    .exists()
    .isDecimal()
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

// Get All Spots     <-- Completed
router.get('/', async (req, res) => {
    let { page, size } = req.query;

    page = Number(page);
    size = Number(size);

    let pagination = {}
    if (!page || isNaN(page)) page = 1
    if (!size || isNaN(size)) size = 20

    if(page <=0 ){
      return res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        errors: {
          "page": "Page must be greater than or equal to 1"}})
    }
    if(size <=0 ){
      return res.status(400).json({
        "message": "Validation Error",
        "statusCode": 400,
        "errors": {
          "size": "Size must be greater than or equal to 1"}})
    }
    if (page >= 1 && size >= 1) {
      pagination.limit = size
      pagination.offset = size * (page - 1)
    }

    const spotList = await Spot.findAll({
        include:[
            {model: SpotImage},
            {model: Review}
        ],
        offset: pagination.offset,
        limit: pagination.limit
    });

    spotList.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.dataValues.preview) {
                spot.dataValues.previewImage = image.url
            } else {
                spot.dataValues.previewImage = null
            }
            delete spot.dataValues.SpotImages;
        })
        let sum = 0;
        if (spot.Reviews.length) {
            spot.Reviews.forEach(review => {
                sum += review.dataValues.stars
            })
            const avg = sum / spot.Reviews.length;
            spot.dataValues.avgRating = avg
        } else {
            spot.dataValues.avgRating = null
        }
        delete spot.dataValues.Reviews;
    })


    res.json(spotList)
    spotList.page = page
    spotList.size = size
    res.json({Spots: spotList, page, size});
});

// Get All Spots Owned by the Current User. <-- completed.
router.get('/current', requireAuth, async (req, res) => {
    const currentUserSpots = await Spot.findAll({
        where: { ownerId: req.user.id },
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });


    currentUserSpots.forEach(spot => {
        spot.SpotImages.forEach(image => {
            if (image.dataValues.preview) {
                spot.dataValues.previewImage = image.url
            } else {
                spot.dataValues.previewImage = null
            }
            delete spot.dataValues.SpotImages;
        })
        let sum = 0;
        if (spot.Reviews.length) {
            spot.Reviews.forEach(review => {
                sum += review.dataValues.stars
            })
            const avg = sum / spot.Reviews.length;
            spot.dataValues.avgRating = avg
        } else {
            spot.dataValues.avgRating = null
        }
        delete spot.dataValues.Reviews;
    })

    res.json({Spot: currentUserSpots})
});

// Get details of a Spot from an Id <-- completed
router.get('/:spotId', async (req, res) => {
    const spotDetails = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review
            },
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

    let sum = 0;
    let count = 0;

    if (spotDetails.Reviews.length) {
        spotDetails.Reviews.forEach(review => {
            sum += review.dataValues.stars
            count += 1
        })
        const avg = sum / spotDetails.Reviews.length;
        spotDetails.dataValues.avgRating = avg;
        spotDetails.dataValues.numReviews = count;
    } else {
        spotDetails.dataValues.avgRating = null;
        spotDetails.dataValues.numReviews = null;
    }
    delete spotDetails.dataValues.Reviews;

    res.json(spotDetails)

});

// When I don't put anything into the body, then it sends the expected output for the validation errors. When I input all required data points expect one, I get "title: 'Bad request.'", "errors": ["Invalid Value"]
    // that's the expected output

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

//Get reviews by spotId <-- completed
router.get('/:spotId/reviews', async(req, res) => {
    const spotReview = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] },
        ]
    });

    console.log(spotReview)

    if (spotReview.length) {
        res.json({Reviews: spotReview})
    } else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});

// Create a Review for a Spot based on the spot's id  <-- Completed
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;
    const user = req.user.id
    const spotId = req.params.spotId

    const getSpot = await Spot.findByPk(spotId);

    if (!getSpot) {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const allReviews = await Review.findOne({
        where: {userId: user, spotId: spotId }
    });

    if(allReviews) {
        res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    } else {
        const makeReview = await Review.create(
            {
                userId: user,
                spotId: spotId,
                review: review,
                stars: stars
            }
        )
        res.status(201).json(makeReview)
    }
});

// Get all bookings for a spot based on the spotId  <-- Completed
// things are in the incorrect order though
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    const user = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId);

    if (spot && user === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {spotId: spot.id},
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
        return res.json(bookings)
    } else if (spot && user !== spot.ownerId) {
        const book = await Booking.findAll({
            where: {spotId: spot.id, userId: user},
            attributes: ['spotId', 'startDate', 'endDate']
        });

        return res.json({Bookings: book});
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
});

// Create a booking from a spot based on the spotId
router.post('/:spotId/bookings', requireAuth, async(req, res) => {
    const user = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId);
    const booked = await Booking.findAll({ where: {spotId: req.params.spotId} })
    const { startDate, endDate } = req.body;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        return res.status(400).json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": ["endDate cannot be on our before startDate"]
        })
    }

    let flag = true;

    booked.forEach(book => {
        if (start.getTime() <= book.startDate.getTime() && end.getTime() >= book.endDate.getTime()) {
            flag = false
        } else if (book.startDate.getTime() <= start.getTime() && book.endDate.getTime() <= end.getTime()) {
            flag = false
        } else if (end.getTime() >= book.startDate.getTime() && end.getTime() <= book.endDate.getTime()) {
            flag = false
        } else if (start.getTime() >= book.startDate.getTime() && start.getTime() <= booked.endDate.getTime()) {
            flag = false
        }
    })


    if (!flag) {
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "stautsCode": 403,
            "errors": [
                "Start date conflicts with an existing booking",
                "End date conflicts with an existing booking"
            ]
        })
    }


    if (spot && user !== spot.ownerId) {
        const book = await Booking.create({
            spotId: req.params.spotId,
            userId: user,
            startDate: startDate,
            endDate: endDate
        })
        return res.json(book)
    } else {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

});

module.exports = router;
