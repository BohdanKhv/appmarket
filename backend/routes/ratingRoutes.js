const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getRatingCountByApp,
    createRating,
    deleteRating
} = require('../controllers/ratingControllers');


router.route('/app/:domain').get(getRatingCountByApp);
router.route('/').post(protect, createRating);
router.route('/:id').delete(protect, deleteRating);


module.exports = router;