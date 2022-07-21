const Developer = require('../models/developerModel');
const User = require('../models/userModel');



// GET /developers/developer/:id
// Returns the developer with the given id
// Public
const getDeveloper = async (req, res) => {
    try {
        const developer = await Developer.findById(req.params.id);
        if (developer) {
            return res.status(200).json(developer);
        } else {
            return res.status(404).json({ msg: 'Developer not found' });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /developers/me
// Returns user's developer profile
// Private
const getMe = async (req, res) => {
    try {
        const developer = await Developer.findById(req.user._id);
        if (developer) {
            return res.status(200).json(developer);
        } else {
            return res.status(404).json({ msg: 'Developer not found' });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /developers/
// Creates a new developer
// Private
const createDeveloper = async (req, res) => {
    try {
        const developer = await Developer.findOne({ user: req.user._id });

        if (developer) {
            return res.status(400).json({ msg: 'Developer already exists' });
        }

        const user = await User.findById(req.user._id);

        const newDeveloper = new Developer({
            user: req.user._id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            country: req.body.country,
            website: req.body.website,
            bio: req.body.bio,
        });

        await newDeveloper.save();

        user.type = 'developer';
        await user.save();

        return res.status(201).json(newDeveloper);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


// PUT /developers/
// Updates the developer with the given id
// Private
const updateDeveloper = async (req, res) => {
    try {
        const developer = await Developer.findById(req.user._id);

        if (!developer) {
            return res.status(404).json({ msg: 'Developer not found' });
        }

        const updatedDeveloper = await Developer.findByIdAndUpdate(req.user._id, req.body, { new: true });

        return res.status(200).json(updatedDeveloper);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


module.exports = {
    getDeveloper,
    getMe,
    createDeveloper,
    updateDeveloper,
}