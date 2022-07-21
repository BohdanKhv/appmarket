const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getApp,
    getAppsByCategory,
    getAppsBySearch,
    createApp,
    updateApp
} = require('../controllers/appControllers');


router.route('/app/:domain').get(getApp);
router.route('/category/:category').get(getAppsByCategory);
router.route('/search/:query').get(getAppsBySearch);
router.route('/').post(createApp);
router.route('/', protect).put(updateApp);


module.exports = router;