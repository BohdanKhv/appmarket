const Comment = require('../models/commentModel');
const App = require('../models/appModel');



// GET /api/comments/app/:domain
// Get all comments for an app
// Public
const getCommentsByApp = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });
        const comments = await Comment.find({ app: app._id });

        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /api/comments
// Create a comment
// Private
const createComment = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.body.domain });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const comment = await Comment.create({
            comment: req.body.comment,
            user: req.user._id,
            app: app._id
        });

        return res.status(201).json(comment);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// DELETE /api/comments/:id
// Delete a comment
// Private
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if(!comment) {
            return res.status(404).json({ msg: "Comment not found" });
        }

        if(comment.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await comment.remove();

        return res.status(200).json({ msg: "Comment deleted" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    getCommentsByApp,
    createComment,
    deleteComment
}