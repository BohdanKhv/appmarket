const mongoose = require('mongoose');


const ratingSchema = new mongoose.Schema({
    rating: {
        type: String,
        enum: ['1', '-1'], // 1 = good, -1 = bad
        required: false
    },
    review: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    app: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'App',
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Rating', ratingSchema);