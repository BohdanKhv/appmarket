const mongoose = require('mongoose');



const listSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('List', listSchema);