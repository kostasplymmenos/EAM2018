var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    isbn    : String,
    eudoxus_id: String,
    author: String,
    publisher: String,
    keywords : [{
      type: String
    }],
    category: String,
    title: String,
    courses : [{
        type: String
    }],
    
});

module.exports = mongoose.model("Book", UserSchema);