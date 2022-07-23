const mongoose = require('mongoose');


const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    cover: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false,
        maxlength: [500, 'Bio can not be more than 500 characters']
    },
    website: {
        type: String,
        required: false,
        // match: [
        //     /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        //     'Please add a valid website URL'
        // ]
    },
    email: {
        type: String,
        required: false,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
}, { timestamps: true });


module.exports = mongoose.model('Developer', developerSchema);