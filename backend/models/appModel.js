const mongoose = require('mongoose');



const appSchema = new mongoose.Schema({
    areaTitle: {
        type: String,
    },
});



module.exports = mongoose.model('App', appSchema);