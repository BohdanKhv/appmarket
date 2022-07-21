const Favorite = require('../models/favoriteModel');
const App = require('../models/appModel');



// GET /api/favorites/add/:domain
// Add an app to favorites
// Private
const addFavorite = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const favorite = await Favorite.create({
            user: req.user._id,
            app: app._id
        });

        return res.status(201).json(favorite);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /api/favorites/remove/:domain
// Remove an app from favorites
// Private
const removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({ user: req.user._id, app: req.params.domain });

        if(!favorite) {
            return res.status(404).json({ msg: "Favorite not found" });
        }

        await favorite.remove();

        return res.status(200).json({ msg: "Favorite removed" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /api/favorites/list
// Get list of apps in favorites
// Private
const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user._id });

        if(!favorites) {
            return res.status(404).json({ msg: "Favorites not found" });
        }

        return res.status(200).json(favorites);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites
}