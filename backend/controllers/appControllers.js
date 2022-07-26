const App = require('../models/appModel');
const Rating = require('../models/ratingModel');
const List = require('../models/listModel');
const Developer = require('../models/developerModel');
const cheerio = require('cheerio');
const axios = require('axios');



const getAppMeta = async (domain) => {
    try {
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gm;
        const domainMatch = domainRegex.exec(domain);
        const domainNew = domainMatch[1];

        const appInfo = await axios.get("https://" + domainNew);
        const $ = cheerio.load(appInfo.data);

        const meta = {
            title: $('title').text(),
            description: $('meta[name="description"]')?.attr('content'),
            keywords: $('meta[name="keywords"]')?.attr('content'),
            classification: $('meta[name="classification"]')?.attr('content'),
            subject: $('meta[name="subject"]')?.attr('content'),
            copyright: $('meta[name="copyright"]')?.attr('content'),
            author: $('meta[name="author"]')?.attr('content'),
            reply: $('meta[name="reply-to"]')?.attr('content'),
            publisher: $('meta[name="publisher"]')?.attr('content'),
            language: $('meta[name="language"]')?.attr('content'),
            category: $('meta[name="category"]')?.attr('content'),
            coverage: $('meta[name="coverage"]')?.attr('content'),
            rating: $('meta[name="rating"]')?.attr('content'),
            icon: $('link[rel="icon"]')?.attr('href') || $('link[rel="shortcut icon"]')?.attr('href'),
            iconApple: $('link[rel="apple-touch-icon"]')?.attr('href'),
        }

        const ogMeta = {
            title: $('meta[property="og:title"]')?.attr('content'),
            name: $('meta[property="og:site_name"]')?.attr('content'),
            description: $('meta[property="og:description"]')?.attr('content'),
            type: $('meta[property="og:type"]')?.attr('content'),
            image: $('meta[property="og:image"]')?.attr('content'),
            url: $('meta[property="og:url"]')?.attr('content'),
        }

        const twitterMeta = {
            twitter: $('meta[property="twitter:site"]')?.attr('content'),
            title: $('meta[property="twitter:title"]')?.attr('content'),
            description: $('meta[property="twitter:description"]')?.attr('content'),
            image: $('meta[property="twitter:image"]')?.attr('content'),
            url: $('meta[property="twitter:url"]')?.attr('content'),
            googlePlayId: $('meta[property="twitter:app:id:googleplay"]')?.attr('content'),
            appStoreId: $('meta[property="twitter:app:id:iphone"]')?.attr('content'),
        }

        const tags = meta?.keywords?.split(', ');

        return { meta, ogMeta, twitterMeta, tags, msg: "Success" };
    } catch (err) {
        // console.log(err);
        return {msg: "Error getting app info"};
    }
}


// GET /apps/developer/me
// Returns all apps created by the logged in user
// Public
const getMe = async (req, res) => {
    try {
        const apps = await App.find({ user: req.user._id });
        if (apps) {
            return res.status(200).json(apps);
        } else {
            return res.status(404).json({ msg: 'Apps not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}

// GET /apps/app/:domain
// Returns the app with the given domain
// Public
const getApp = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain }).populate('developer');
        if (app) {
            let userRating = '0'
            let userFavorite = false
            if(req.user) {
                const rating = await Rating.findOne({ app: app._id, user: req.user._id });
                userRating = rating?.rating || '0';

                const favorite = await List.findOne({ app: app._id, user: req.user._id, name: 'Favorites' });
                userFavorite = favorite ? true : false;
            }

            return res.status(200).json({app, userRating, userFavorite});
        } else {
            return res.status(404).json({ msg: 'App not found' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /apps/developer/:id
// Returns all apps with the given developer
// Public
const getDeveloperApps = async (req, res) => {
    try {
        const apps = await App.find({ developer: req.params.id });
        if (apps) {
            return res.status(200).json(apps);
        } else {
            return res.status(404).json({ msg: 'Apps not found' });
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

        const apps = await App.find({ categories: req.params.category }).limit(limit).skip(offset);
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

        const apps = await App.find({ $text: { $search: req.params.query } }).limit(limit).skip(offset);
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
        const { domain, github, categories, publisher } = req.body;
        const developer = await Developer.findOne({ developer: req.user._id });

        if (!developer && !publisher) {
            return res.status(404).json({ msg: 'You are not a developer, please register a developer page.' });
        }

        if(!domain) {
            return res.status(400).json({ msg: 'Please fill in all required fields' });
        }

        // Get domain from URL
        const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/gm;
        const domainMatch = domainRegex.exec(domain);
        const domainNew = domainMatch[1];

        // Check if app already exists
        const app = await App.findOne({ domain: domainNew });

        if (app) {
            return res.status(409).json({ msg: 'App already exists' });
        }

        const getMeta = await getAppMeta(domainNew);

        if(getMeta.msg === "Success") {
            const appNew = new App({
                domain: domainNew,
                developer: developer,
                publisher: publisher,
                categories: categories,
                user: req.user ? req.user._id : null,
                github: github,
                verified: false,
                url: 'https://' + domainNew,
                tags: getMeta.tags,
                meta: getMeta.meta,
                ogMeta: getMeta.ogMeta,
                twitterMeta: getMeta.twitterMeta,
            });

            try {
                await appNew.save();
                return res.status(201).json(appNew);
            } catch (err) {
                return res.status(500).json({ msg: "Server error. Not able to save the app" });
            }
        } else {
            return res.status(500).json({ msg: getMeta.msg });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Server error" });
    }
}


// GET /apps/app/meta/:domain
// Updates the app meta
// Private
const updateAppMeta = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });

        if(!app) {
            return res.status(404).json({ msg: 'App not found' });
        }

        const getMeta = await getAppMeta(app.domain);

        if(getMeta.msg === "Success") {
            app.meta = getMeta.meta;
            app.ogMeta = getMeta.ogMeta;
            app.twitterMeta = getMeta.twitterMeta;
            app.tags = getMeta.tags;
            await app.save();
            return res.status(200).json(app);
        } else {
            return res.status(500).json({ msg: getMeta.msg });
        }
    }
    catch (err) {
        console.log(err);
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


// DELETE /apps/app/:domain
// Deletes an app with the given domain
// Private
const deleteApp = async (req, res) => {
    try {
        const app = await App.findOne({ domain: req.params.domain });

        if (!app) {
            return res.status(404).json({ msg: 'App not found' });
        }

        if(app.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        await app.remove();
        return res.status(200).json(app);
    } catch (err) {
        return res.status(500).json({ msg: "Server error" });
    }
}



module.exports = {
    getMe,
    getApp,
    getDeveloperApps,
    getAppsByCategory,
    getAppsBySearch,
    createApp,
    updateAppMeta,
    updateApp,
    deleteApp,
}