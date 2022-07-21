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
        const app = await App.findOne({ domain: req.body.domain });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const rating = await Rating.create({
            rating: req.body.rating,
            user: req.user._id,
            app: app._id
        });

        return res.status(201).json(rating);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// DELETE /api/ratings/:id
// Delete a rating
// Private
const deleteRating = async (req, res) => {
    try {
        const rating = await Rating.findById(req.params.id);

        if(!rating) {
            return res.status(404).json({ msg: "Rating not found" });
        }

        if(rating.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: "Not authorized" });
        }

        await rating.remove();

        return res.status(200).json(rating);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    getRatingCountByApp,
    createRating,
    deleteRating
}