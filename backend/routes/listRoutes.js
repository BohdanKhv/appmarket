const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addList,
    removeList,
    getLists
} = require('../controllers/listControllers');


router.route('/add/:domain').post(protect, addList);
router.route('/remove/:domain').post(protect, removeList);
router.route('/list').get(protect, getLists);


module.exports = router;