const express = require('express');
const router = express.Router();
const { protect, isAuth } = require('../middleware/authMiddleware');
const {
    getMe,
    getApp,
    getDeveloperApps,
    getAppsByCategory,
    getAppsBySearch,
    createApp,
    updateAppMeta,
    updateApp,
    deleteApp,
    scrapeTopApps
} = require('../controllers/appControllers');

router.route('/developer/me').get(protect, getMe);
router.route('/meta/:domain').get(protect, updateAppMeta);
router.route('/app/:domain').get(isAuth, getApp);
router.route('/app/:domain').delete(protect, deleteApp);
router.route('/developer/:id').get(getDeveloperApps);
router.route('/category/:category').get(getAppsByCategory);
router.route('/search/:query').get(getAppsBySearch);
router.route('/').post(protect, createApp);
router.route('/', protect).put(updateApp);
router.route('/scrape/top-list').get(scrapeTopApps);


module.exports = router;