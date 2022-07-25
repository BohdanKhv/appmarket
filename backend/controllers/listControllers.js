const List = require('../models/listModel');
const App = require('../models/appModel');



// GET /api/favorites/add/:domain
// Add an app to favorites
// Private
const addList = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });

        if(!app) {
            return res.status(404).json({ msg: "App not found" });
        }

        const list = await List.create({
            user: req.user._id,
            app: app._id
        });

        return res.status(201).json(list);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /api/lists/remove/:domain
// Remove an app from lists
// Private
const removeList = async (req, res) => {
    try {
        const list = await List.findOne({ user: req.user._id, app: req.params.domain });

        if(!list) {
            return res.status(404).json({ msg: "List not found" });
        }

        await list.remove();

        return res.status(200).json({ msg: "List removed" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /api/lists/list
// Get list of apps in lists
// Private
const getLists = async (req, res) => {
    try {
        const lists = await List.find({ user: req.user._id });

        if(!lists) {
            return res.status(404).json({ msg: "lists not found" });
        }

        return res.status(200).json(lists);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    addList,
    removeList,
    getLists
}