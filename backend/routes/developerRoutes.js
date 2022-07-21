const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getDeveloper,
    getMe,
    createDeveloper,
    updateDeveloper,
} = require('../controllers/developerControllers');


router.route('/developer/:id').get(getDeveloper);
router.route('/me').get(protect, getMe);
router.route('/').post(protect, createDeveloper);
router.route('/').put(protect, updateDeveloper);


module.exports = router;