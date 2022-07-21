const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getCommentsByApp,
    createComment,
    deleteComment
} = require('../controllers/commentControllers');


router.route('/app/:domain').get(getCommentsByApp);
router.route('/').post(protect, createComment);
router.route('/:id').delete(protect, deleteComment);


module.exports = router;