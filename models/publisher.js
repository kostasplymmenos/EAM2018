var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var PublisherSchema = new mongoose.Schema({
    email    : String,
    password : String,
    publisherName: String,
    telephone: String,
    address  : String,
    booksPublished : [{
        type: Schema.Types.ObjectId, ref: "Book"
    }]
});
PublisherSchema.plugin(passportLocalMongoose,{usernameField:"email"});

PublisherSchema.statics.serializeUser = function() {
    return function(user, cb) {
        cb(null, user._id);
    }
};

PublisherSchema.statics.deserializeUser = function() {
    var self = this;

    return function(id, cb) {
        self.findOne({_id: id}, cb);
    }
};

module.exports = mongoose.model("Publisher", PublisherSchema);