const mongoose = require('mongoose');



const appSchema = new mongoose.Schema({
    domain: {
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
        required: true
    },
    name: {
        type: String,
        required: true
    },
    monetization: {
        type: String,
        required: true,
        enum: ['free', 'paid', 'subscription', 'ads', 'other']
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    thumbnail: {
        type: String,
        required: false
    },
    media: {
        video: {
            type: String,
            required: false
        },
        images: {
            type: Array,
            required: false
        }
    },
    meta: {
        description: {
            type: String,
            required: false
        },
        keywords: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        thumbnail: {
            type: String,
            required: false
        }
    },
    verified: {
        type: Boolean,
        required: false
    },
    rank: {
        type: Number,
        required: false,
        unique: true
    }
}, { timestamps: true });



module.exports = mongoose.model('App', appSchema);