const mongoose = require('mongoose');



const appSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: false
    },
    publisher: {
        type: String,
        required: false
    },
    categories: {
        type: Array,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    tags: {
        type: Array,
        required: false
    },
    verified: {
        type: Boolean,
        required: false
    },
    upVotes: {
        type: Number,
        required: false,
        default: 0
    },
    downVotes: {
        type: Number,
        required: false,
        default: 0
    },
    favorites: {
        type: Number,
        required: false,
        default: 0
    },
    meta: {
        title: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        keywords: {
            type: String,
            required: false
        },
        classification: {
            type: String,
            required: false
        },
        subject: {
            type: String,
            required: false
        },
        copyright: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: false
        },
        reply: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        coverage: {
            type: String,
            required: false
        },
        distribution: {
            type: String,
            required: false
        },
        rating: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
    },
    ogMeta: {
        title: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },
    },
    twitterMeta: {
        twitter: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        googlePlayId: {
            type: String,
            required: false
        },
        appStoreId: {
            type: String,
            required: false
        }
    },
}, { timestamps: true });



module.exports = mongoose.model('App', appSchema);