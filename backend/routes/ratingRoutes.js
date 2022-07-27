const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getRatingsByAppId,
    createRating,
    deleteRating,
    createReview,
    deleteReview
} = require('../controllers/ratingControllers');


router.route('/app/:domain').get(getRatingsByAppId);
router.route('/rating').post(protect, createRating);
router.route('/rating/delete').post(protect, deleteRating);
router.route('/review/').post(protect, createReview);
router.route('/review/delete').post(protect, deleteReview);


module.exports = router;