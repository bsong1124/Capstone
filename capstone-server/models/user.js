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

const CoinsSchema = new Schema({
    coinName: String,
    coinTicker: String,
  });

module.exports = {
    User: mongoose.model('User', UserSchema),
    Coins: mongoose.model('Coins', CoinsSchema)
}

