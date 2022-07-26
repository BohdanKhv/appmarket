const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addList,
    removeList,
    getLists
} = require('../controllers/listControllers');


router.route('/:appId').post(protect, addList);
router.route('/:appId').delete(protect, removeList);
router.route('/').get(protect, getLists);


module.exports = router;