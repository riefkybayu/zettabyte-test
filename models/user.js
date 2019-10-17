const mongoose = require("mongoose");
const model_picture = require("./picture");

const userSchema = mongoose.Schema({
    user_id : Number,
    name : String,
    age : Number,
    email : String,
    address : String,
    pictures : [],
});

module.exports = mongoose.model('user', userSchema);