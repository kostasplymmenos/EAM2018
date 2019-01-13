const Publisher = require('../../models/publisher.js')
const Book = require('../../models/book.js')
const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

var options = {};

function servePublisherHome(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/publisher/publisherHome.ejs',{options:options,error:null})
}

function servePublisherInfo(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/publisher/publisherInfo.ejs',{options:options})
}

function servePublisherSearch(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/publisher/publisherSearch.ejs',{options:options})
}

function searchBook(req,res){
    var query = {}
    if(req.query.category)
        query.category = req.query.category
    
    console.log(query);
    if(!Object.keys(query).length) //if empty query return 404
        return res.status(404).send('Not found')

    Book.find(query,function(err,docs){
        if(err)
            console.log("error",err);
            
        // console.log(docs);
        options.books = docs
        
        return res.send(JSON.stringify(docs))  
    })

    // var str = 'You amde a query for book with '
    // if(req.query.author)
    //     str += "author " + req.query.author
    // if(req.query.title)
    //     str += "title " + req.query.title
    // res.send(str)
}

function servePublisherProfile(req,res){
    // var options = {
    //     signedIn: false,

    // }
    // if(req.session.Auth){
    //     options.signedIn = true
    //     options.user = req.session.Auth
    // }
    return res.render('./../views/publisher/publisherProfile.ejs',{options:options})
}

function servePublisherBrowser(req,res){
    Book.find({},function(err,docs){
        if(err)
            console.log("error",err);
            
        //console.log(docs);
        options.books = docs
        
        return res.render('./../views/publisher/publisherBrowser.ejs',{options:options})  
    })
}

function publisherBrowserFilter(req,res){
    var query = {}
    if(req.query.category)
        query.category = req.query.category
    
    Book.find(query,function(err,docs){
        if(err)
            console.log("error",err);
            
        console.log(docs);
        options.books = docs
        
        return res.send(JSON.stringify(docs))  
    })
}

function updatePublisher(req,res){
    console.log(req.body);
    Publisher.findOneAndUpdate({'_id': req.session.Auth._id},req.body,{new:true}).then((publisher) => {
        req.session.Auth = publisher
        console.log(publisher);
        options.user = req.session.Auth
        return res.status(201).json({})
        
    }).catch(err => {
        return res.status(400).json({})
    })
}

function servePublishPage(req,res){
    return res.render('./../views/publisher/publisherPublishPage.ejs',{options:options})
}

function publishBooks(req,res){
    // var isbnArray = req.body
    // // find books in isbnarray
    // Book.find({'isbn': { $in: isbnArray } }).then(docs => {
    //     //push an new book submission in booksubmissions array of user document
    //     var updateQuery = {
    //         $push: {
    //             bookSubmissions: {
    //                 timestamp: Date.now(),
    //                 bookIds: docs.map(doc => doc._id) //make a new array of docs that contain only their ids
    //             }
    //         }
    //     }
    //     return User.update({'_id': req.session.Auth._id},updateQuery) // update user in session with updateQuery - this returns a promise
    // }).then((results) => {
    //     //after all above if success return 201
    //     console.log(results); 
    //     return res.status(201).json({})
    // }).catch(err => {
    //     // if err occured in the above IO calls handle it 
    //     console.log(err);
    //     return res.status(400).json(err)
    // })
}

function serveRegisterPage(req,res){
    // var options = {
    //     signedIn: false,
    //     error: req.session.error
    // }
    // delete req.session.error
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/publisher/publisherRegister.ejs',{options:options})
}

function registerPublisher(req,res){
    //check if password and passwordCheck are the same
    if(req.body.password != req.body.passwordCheck){
        req.session.error = "passwords don't match"
        return res.redirect(req.originalUrl) //stay in register
    }

    //create new user from request's form
    var newPublisher = new Publisher({
                            email     : req.body.username,
                            publisherName : req.body.publisherName,
                            address: req.body.address,
                            telephone : req.body.tel
    });
    

    //register new user to users collection (via mongoose)
    Publisher.register(newPublisher, req.body.password, function(err, publisher){
        if(err){
            req.session.error = "Couldn't register User"
            console.log('[ERROR] Could not register User',err);
            return res.redirect(req.originalUrl)
        }
        else{
            //log in the new user
            passport.serializeUser(Publisher.serializeUser());
            passport.authenticate("local-publisher")(req, res, function(err){
                if(err){
                    req.session.error = "Couldn't Authenticate registered User"
                    console.log('[ERROR] Could not Authenticate registered User');
                    return res.redirect(req.originalUrl)
                }
                req.session.Auth = publisher;
                //redirect to logged user's home page
                console.log("[INFO] User Registered Succesfully: " + req.session.Auth.email);
                options.signedIn = true
                options.user = req.session.Auth
                return res.redirect('/publisher');
            });
        }
    });
}

function loginPublisher(req,res,next){
    passport.serializeUser(Publisher.serializeUser());
    passport.authenticate("local-publisher", function(err, publisher, info) {
        if(err){
            req.session.error = "Couldn't authenticate login"
            console.log("[ERROR] Couldn't Authenticate User login"); 
            return res.render('./../views/publisher/publisherHome.ejs',{options:options, error:err})
        }
        if(!publisher){
            req.session.error = "Invalid credentials"
            console.log("[ERROR] Invalid User Credentials");
            return res.render('./../views/publisher/publisherHome.ejs',{options:options,error: req.session.error})
        }
    
        //log in user
        req.logIn(publisher, function(err){
          if(err){
            console.log("[ERROR] Couldn't login publisher");
            return next(err);
          }
          //store logged in user data to a "session" variable
          req.session.Auth = publisher;
          options.signedIn = true
          options.user = req.session.Auth
          console.log("[INFO] Publisher logged in: " + req.session.Auth.email);
          return res.redirect('/publisher');
        });
    })(req, res, next);
}

function logoutPublisher(req,res){
    console.log("[INFO] Publisher Logged Out: " + req.session.Auth.email);
    //terminate user session
    // passport.deserializeUser(Publisher.deserializeUser());
    req.logout();
    delete req.session.Auth
    delete options.user
    delete options.signedIn
    res.redirect("/");
}

module.exports = {
    updatePublisher,
    servePublisherHome,
    servePublisherInfo,
    servePublisherSearch,
    searchBook,
    servePublisherBrowser,
    servePublisherProfile,
    servePublishPage,
    publishBooks,
    serveRegisterPage,
    registerPublisher,
    loginPublisher,
    logoutPublisher,
    publisherBrowserFilter
}