const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addFavorite,
    removeFavorite,
    getFavorites
} = require('../controllers/favoriteControllers');


router.route('/add/:domain').post(protect, addFavorite);
router.route('/remove/:domain').post(protect, removeFavorite);
router.route('/list').get(protect, getFavorites);


module.exports = router;