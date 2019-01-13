const User = require('../../models/user.js')
const Book = require('../../models/book.js')
const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

var options = {};

function serveStudentHome(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/student/studentHome.ejs',{options:options,error:null})
}

function serveStudentInfo(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/student/studentInfo.ejs',{options:options})
}

function serveStudentSearch(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/student/studentSearch.ejs',{options:options})
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

function serveStudentProfile(req,res){
    // var options = {
    //     signedIn: false,

    // }
    // if(req.session.Auth){
    //     options.signedIn = true
    //     options.user = req.session.Auth
    // }
    return res.render('./../views/student/studentProfile.ejs',{options:options})
}

function serveStudentBrowser(req,res){
    Book.find({},function(err,docs){
        if(err)
            console.log("error",err);
            
        //console.log(docs);
        options.books = docs
        
        return res.render('./../views/student/studentBrowser.ejs',{options:options})  
    })
}

function StudentBrowserFilter(req,res){
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

function updateStudent(req,res){
    console.log(req.body);
    User.findOneAndUpdate({'_id': req.session.Auth._id},req.body,{new:true}).then((user) => {
        req.session.Auth = user
        console.log(user);
        options.user = req.session.Auth
        return res.status(201).json({})
        
    }).catch(err => {
        return res.status(400).json({})
    })
}

function registerBooks(req,res){
    var isbnArray = req.body
    // find books in isbnarray
    Book.find({'isbn': { $in: isbnArray } }).then(docs => {
        //push an new book submission in booksubmissions array of user document
        var updateQuery = {
            $push: {
                bookSubmissions: {
                    timestamp: Date.now(),
                    bookIds: docs.map(doc => doc._id) //make a new array of docs that contain only their ids
                }
            }
        }
        return User.update({'_id': req.session.Auth._id},updateQuery) // update user in session with updateQuery - this returns a promise
    }).then((results) => {
        //after all above if success return 201
        console.log(results); 
        return res.status(201).json({})
    }).catch(err => {
        // if err occured in the above IO calls handle it 
        console.log(err);
        return res.status(400).json(err)
    })
}

function serveBookSubmissionHistoryPage(req,res){
    User.findOne({'_id': req.session.Auth._id}).then(doc => {
        options.history = doc.bookSubmissions
        return res.render('./../views/student/studentHistory.ejs',{options:options})
    })
}

function serveRegisterPage(req,res){
    // var options = {
    //     signedIn: false,
    //     error: req.session.error
    // }
    // delete req.session.error
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/student/studentRegister.ejs',{options:options})
}

function registerStudent(req,res){
    //check if password and passwordCheck are the same
    if(req.body.password != req.body.passwordCheck){
        req.session.error = "passwords don't match"
        return res.redirect(req.originalUrl) //stay in register
    }

    //create new user from request's form
    var newUser = new User({email     : req.body.username,
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            university : req.body.university,
                            department : req.body.department,
                            regNumber: req.body.regNum,
                            telephone : req.body.tel
    });
    

    //register new user to users collection (via mongoose)
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.session.error = "Couldn't register User"
            console.log('[ERROR] Could not register User');
            return res.redirect(req.originalUrl)
        }
        else{
            //log in the new user
            passport.authenticate("local")(req, res, function(err){
                if(err){
                    req.session.error = "Couldn't Authenticate registered User"
                    console.log('[ERROR] Could not Authenticate registered User');
                    return res.redirect(req.originalUrl)
                }
                req.session.Auth = user;
                //redirect to logged user's home page
                console.log("[INFO] User Registered Succesfully: " + req.session.Auth.email);
                options.signedIn = true
                options.user = req.session.Auth
                return res.redirect('/student');
            });
        }
    });
}

function loginStudent(req,res,next){
    passport.authenticate("local", function(err, user, info) {
        if(err){
            req.session.error = "Couldn't authenticate login"
            console.log("[ERROR] Couldn't Authenticate User login"); 
            return res.render('./../views/student/studentHome.ejs',{options:options, error:err})
        }
        if(!user){
            req.session.error = "Invalid credentials"
            console.log("[ERROR] Invalid User Credentials");
            return res.render('./../views/student/studentHome.ejs',{options:options,error: req.session.error})
        }
    
        //log in user
        req.logIn(user, function(err){
          if(err){
            console.log("[ERROR] Couldn't login User");
            return next(err);
          }
          //store logged in user data to a "session" variable
          req.session.Auth = user;
          options.signedIn = true
          options.user = req.session.Auth
          console.log("[INFO] User logged in: " + req.session.Auth.email);
          return res.redirect('/student');
        });
    })(req, res, next);
}

function logoutStudent(req,res){
    console.log("[INFO] User Logged Out: " + req.session.Auth.email);
    //terminate user session
    req.logout();
    delete req.session.Auth
    delete options.user
    delete options.signedIn
    res.redirect("/");
}

module.exports = {
    updateStudent,
    serveStudentHome,
    serveStudentInfo,
    serveStudentSearch,
    searchBook,
    serveStudentBrowser,
    serveStudentProfile,
    registerBooks,
    serveBookSubmissionHistoryPage,
    serveRegisterPage,
    registerStudent,
    loginStudent,
    logoutStudent,
    StudentBrowserFilter
}