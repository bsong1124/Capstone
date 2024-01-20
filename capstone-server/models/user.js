const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: String,
    email: String,
    portfolio: [{
        coinName:String,
        coinTicker: String
    }]
})

module.exports = mongoose.model("User", UserSchema)

