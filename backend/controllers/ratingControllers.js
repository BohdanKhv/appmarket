const Rating = require('../models/ratingModel');
const App = require('../models/appModel');



// GET /api/ratings/app/:domain
// Get rating count for an app
// Public
const getRatingsByAppId = async (req, res) => {
    try {
        const { offset, limit } = req.query;

        const app = await App
        .findOne({ domain: req.params.domain })
        .skip(offset || 0)
        .limit(limit || 10)
        .populate('user', 'fullName avatar');
        
        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const rating = await Rating.countDocuments({ app: app._id });

        return res.status(200).json(rating);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /api/ratings/rating
// Create a rating
// Private
const createRating = async (req, res) => {
    try {
        if(!req.body.rating) {
            return res.status(400).json({ msg: "Rating is required" });
        }

        const app = await App.findById(req.body.app);

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


// POST /api/ratings/rating/delete
// Delete a rating
// Private
const deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findOne({ user: req.user._id, app: req.body.app });

        if(!rating) {
            return res.status(404).json({ msg: "Rating not found" });
        }

        const app = await App.findOne({ _id: req.body.app });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        app.upVotes = rating.rating === '1' ? app.upVotes - 1 : app.upVotes;
        app.downVotes = rating.rating === '-1' ? app.downVotes - 1 : app.downVotes;

        rating.rating = undefined;

        await rating.save();
        await app.save();
        return res.status(200).json({appUpvote: app.upVotes, appDownvote: app.downVotes});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /api/ratings/review
// Create a review
// Private
const createReview = async (req, res) => {
    try {
        const reviewCheck = await Rating.findOne({ user: req.user._id, app: req.body.app });

        if(reviewCheck && reviewCheck.review) {
            return res.status(400).json({ msg: "You already reviewed this app" });
        }

        if(reviewCheck && !reviewCheck.review) {
            const app = await App.findOne({ _id: req.body.app });
            reviewCheck.review = req.body.review;

            await reviewCheck.save();
            app.reviews = app.reviews + 1;

            await app.save();
            return res.status(201).json({review: reviewCheck, appReviews: app.reviews});
        }

        const app = await App.findOne({ _id: req.body.app });

        const review = await Rating.create({
            review: req.body.review,
            user: req.user._id,
            app: app._id
        });

        app.reviews = app.reviews + 1;

        await app.save();

        return res.status(201).json({review, appReviews: app.reviews});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /api/ratings/review/delete
// Delete a review
// Private
const deleteReview = async (req, res) => {
    try {
        const rating = await Rating.findOne({ user: req.user._id, app: req.body.app });

        if(!rating) {
            return res.status(400).json({ msg: "You did not review this app" });
        }

        const app = await App.findOne({ _id: req.body.app });

        rating.review = undefined;

        app.reviews = app.reviews - 1;

        await app.save();
        await rating.save();

        return res.status(201).json({rating, appReviews: app.reviews});
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    getRatingsByAppId,
    createRating,
    deleteRating,
    createReview,
    deleteReview
}