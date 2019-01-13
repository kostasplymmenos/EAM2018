var express               = require('express');
var mongoose              = require("mongoose");
var passport              = require('passport');
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User                  = require('./models/user.js');
var Publisher             = require('./models/publisher.js')
var bodyParser            = require("body-parser");
var http                  = require('http');
var path = require('path')
var methodOverride        = require("method-override");

var homeRoutes = require('./lib/routes/home.js')
var studentRoutes = require('./lib/routes/student.js')
var publisherRoutes = require('./lib/routes/publisher.js')

//main app
var app = express();

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
app.use(require('express-session')({
    secret            : "kos",
    resave            : false,
    saveUninitialized : false
}));

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

//passport stuff, used for login and user registration
app.use(passport.initialize());
app.use(passport.session());
passport.use('local-student',new LocalStrategy(User.authenticate()));
passport.use('local-publisher',new LocalStrategy(Publisher.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.deserializeUser(Publisher.deserializeUser());

//using routes required above
app.use(publisherRoutes)
app.use(studentRoutes)
app.use(homeRoutes)

//vars to run http / https (on different ports)
var httpServer = http.createServer(app);

httpServer.listen(8080,function(){
   console.log("[INFO] HTTP Server Has Started");
});


/*
username
Student:
AM
onoma
epitheto
etos eisagogis
idrima
tmhma
email
kinito
*/

/*
Book:
sugrafeas
kwdikos ston eudoxo
ISBN
Lekseis kleidia
Ekdotis
*/

/*
shmeio dianomhs:
username
pwd
diefthinsi
[id vivlio, ar.diathesimwn]
wres leitourgies
onoma katasthmatos
*/

/*
dhlwsh:
list_vivliwn pou dhlwthikan
periodos dhlwshs
*/
