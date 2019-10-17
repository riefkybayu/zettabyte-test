const mongoose = require("mongoose");

const pictureSchema = mongoose.Schema({
    user_id : Number,
    pic_id : Number,
    pic_name : String,
    pic_url : String,
    // date : String,
});

module.exports = mongoose.model('picture', pictureSchema);