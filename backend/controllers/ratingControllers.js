const Rating = require('../models/ratingModel');
const App = require('../models/appModel');



// GET /api/ratings/app/:domain
// Get rating count for an app
// Public
const getRatingCountByApp = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });
        
        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const rating = await Rating.countDocuments({ app: app._id });

        return res.status(200).json(rating);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /api/ratings
// Create a rating
// Private
const createRating = async (req, res) => {
    try {
        if(!req.body.rating) {
            return res.status(400).json({ msg: "Rating is required" });
        }

        const app = await App.findOne({ domain: req.body.domain });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const rating = await Rating.findOne({ user: req.user._id, app: app._id });

        if(rating) {
            app.upVotes = rating.rating === '1' ? app.upVotes - 1: app.upVotes;
            app.downVotes = rating.rating === '-1' ? app.downVotes - 1 : app.downVotes;

            rating.rating = req.body.rating;

            app.upVotes = req.body.rating === '1' ? app.upVotes + 1: app.upVotes;
            app.downVotes = req.body.rating === '-1' ? app.downVotes + 1 : app.downVotes;

            await rating.save();
            await app.save();
            return res.status(200).json({userRating: rating.rating, appUpvote: app.upVotes, appDownvote: app.downVotes});
        }

        if(!rating) {
            const newRating = new Rating({
                user: req.user._id,
                app: app._id,
                rating: req.body.rating
            });

            app.upVotes = req.body.rating === '1' ? app.upVotes + 1: app.upVotes;
            app.downVotes = req.body.rating === '-1' ? app.downVotes + 1 : app.downVotes;

            await newRating.save();
            await app.save();
            return res.status(200).json({userRating: newRating.rating, appUpvote: app.upVotes, appDownvote: app.downVotes});
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// DELETE /api/ratings/
// Delete a rating
// Private
const deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findOne({ user: req.user._id, app: req.params.appId });

        if(!rating) {
            return res.status(404).json({ msg: "Rating not found" });
        }

        const app = await App.findOne({ _id: req.params.appId });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        app.upVotes = rating.rating === '1' ? app.upVotes - 1 : app.upVotes;
        app.downVotes = rating.rating === '-1' ? app.downVotes - 1 : app.downVotes;

        await rating.remove();
        await app.save();
        return res.status(200).json({appUpvote: app.upVotes, appDownvote: app.downVotes});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    getRatingCountByApp,
    createRating,
    deleteRating
}