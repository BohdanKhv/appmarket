const express = require('express');
const router = express.Router();
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
router.route('/').put(updateApp);


module.exports = router;