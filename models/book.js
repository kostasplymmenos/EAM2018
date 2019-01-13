var mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
    isbn    : String,
    eudoxus_id: String,
    author: String,
    publisher: String,
    keywords : [{
      type: String
    }],
    category: String,
    title: String,
    quantity: Number
    
});

module.exports = mongoose.model("Book", BookSchema);