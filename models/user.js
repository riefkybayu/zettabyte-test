const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    age : Number,
    email : String,
    address : String
});

module.exports = mongoose.model('user', userSchema);