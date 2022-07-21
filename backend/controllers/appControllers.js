const App = require('../models/appModel');
const cheerio = require('cheerio');
const axios = require('axios');



// GET /apps/app/:domain
// Returns the app with the given domain
// Public
const getApp = async (req, res) => {
    try {
        const app = App.findOne({ domain: req.params.domain });
        if (app) {
            return res.status(200).json(app);
        } else {
            return res.status(404).json({ msg: 'App not found' });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /apps/category/:category
// Returns all apps with the given category
// Public
const getAppsByCategory = async (req, res) => {
    try {
        const { limit, offset } = req.query;

        const apps = App.find({ categories: req.params.category }).limit(limit).skip(offset);
        if (apps) {
            return res.status(200).json(apps);
        } else {
            return res.status(404).json({ msg: 'Apps not found' });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /apps/search/:query
// Returns all apps with the given query
// Public
const getAppsBySearch = async (req, res) => {
    try {
        const { limit, offset } = req.query;

        const apps = App.find({ $text: { $search: req.params.query } }).limit(limit).skip(offset);
        if (apps) {
            return res.status(200).json(apps);
        } else {
            return res.status(404).json({ msg: 'Apps not found' });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// POST /apps/app
// Creates a new app
// Public
const createApp = async (req, res) => {
    try {
        const { domain, name, description, categories, tags } = req.body;

        // Get domain from URL
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gm;
        const domainMatch = domainRegex.exec(domain);
        const domainNew = domainMatch[1];

        // Check if app already exists
        const app = App.findOne({ domain: domainNew });

        if (app) {
            return res.status(409).json({ msg: 'App already exists' });
        }

        // Get app info from URL
        try {
            const appInfo = await axios.get("https://" + domainNew);
            const $ = cheerio.load(appInfo.data);

            const appMeta = {
                description: $('meta[name="description"]').attr('content'),
                keywords: $('meta[name="keywords"]').attr('content'),
                title: $('title').text(),
                author: $('meta[name="author"]').attr('content'),
                icon: $('link[rel="icon"]').attr('href'),
                thumbnail: $('meta[property="og:image"]').attr('content'),
            }

            const appNew = new App({
                domain: domainNew,
                name: name,
                user: req.user ? req.user._id : null,
                description: description,
                categories: categories,
                tags: tags,
                meta: appMeta,
                verified: false
            });

            await appNew.save();
            return res.status(201).json(appNew);
        } catch (err) {
            return res.status(500).json({ msg: "Was not able to get app info, please try again later" });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}


// PUT /apps/app/:domain
// Updates an app with the given domain
// Private
const updateApp = async (req, res) => {
    try {
        const app = App.findOne({ domain: req.params.domain });

        if (!app) {
            return res.status(404).json({ msg: 'App not found' });
        }

        if(app.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const updateApp = await App.findOneAndUpdate({ domain: req.params.domain }, req.body, { new: true });
        return res.status(200).json(updateApp);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}




module.exports = {
    getApp,
    getAppsByCategory,
    getAppsBySearch,
    createApp,
    updateApp
}