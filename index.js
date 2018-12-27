var express               = require('express');
var mongoose              = require("mongoose");
// var passport              = require('passport');
// var LocalStrategy         = require("passport-local");
// var passportLocalMongoose = require("passport-local-mongoose");
// var User                  = require('./models/user.js');
var bodyParser            = require("body-parser");
var fs                    = require('fs');
var http                  = require('http');
var path = require('path')
// var https                 = require('https');
var methodOverride        = require("method-override");

var homeRoutes = require('./lib/routes/home.js')
var studentRoutes = require('./lib/routes/student.js')
// var homeRoutes = require('./lib/routes/home.js')

//vars neededed for ssl
// var privateKey  = fs.readFileSync("./open_ssl/server.key", 'utf8');
// var certificate = fs.readFileSync("./open_ssl/server.cert", 'utf8');
// var credentials = {key: privateKey, cert: certificate};

//main app
var app = express();

//controllers


//connect to db
//useNewUrlParser: true to prevent warnings
mongoose.connect("mongodb://localhost/eam", { useNewUrlParser: true });

//uses
app.use(express.static(__dirname + '/public/'));
// app.use(express.static(__dirname + '/user_data/'));

// app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// to use put methods when updating or delete
app.use(methodOverride('_method'));

//express session is needed for login/registration password security
// app.use(require('express-session')({
//     secret            : "pol&kos",
//     resave            : false,
//     saveUninitialized : false
// }));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

//passport stuff, used for login and user registration
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//using controllers required above
app.use(studentRoutes)
app.use(homeRoutes)

// app.use(homeController)
// app.use(studentController)

//app.use(publisherController)
//vars to run http / https (on different ports)
var httpServer = http.createServer(app);

httpServer.listen(8080,function(){
   console.log("[INFO] HTTP Server Has Started");
});