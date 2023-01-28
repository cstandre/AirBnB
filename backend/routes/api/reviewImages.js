const express = require('express');
const { requireAuth } = require('../../utils/auth')
const { ReviewImage, Review } = require('../../db/models');
const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const reviewImg = await ReviewImage.findByPk(req.params.imageId);

    if (!reviewImg) {
        res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }

    const review = await Review.findOne({
        where: { id: reviewImg.reviewId }
    })

    if (reviewImg && user === review.userId) {
        await reviewImg.destroy()
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})

module.exports = router;
