var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    email    : String,
    password : String,
    firstname: String,
    lastname : String,
    telephone: String,
    university: String,
    department: String,
    regNumber: String
    // books : [{
    //   type: Schema.Types.ObjectId, ref: "Book"
    // }]
});
UserSchema.plugin(passportLocalMongoose,{usernameField:"email"});

UserSchema.statics.serializeUser = function() {
    return function(user, cb) {
        cb(null, user._id);
    }
};

UserSchema.statics.deserializeUser = function() {
    var self = this;

    return function(id, cb) {
        self.findOne({_id: id}, cb);
    }
};

module.exports = mongoose.model("User", UserSchema);