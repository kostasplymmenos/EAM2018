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
    return res.render('./../views/student/studentHome.ejs',{options:options})
}

function serveStudentInfo(req,res){
    // var options = {
    //     signedIn: false
    // }
    // if(req.session.Auth)
    //     options.signedIn = true
    return res.render('./../views/student/infoStudent.ejs',{options:options})
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
    var str = 'You amde a query for book with '
    if(req.query.author)
        str += "author " + req.query.author
    if(req.query.title)
        str += "title " + req.query.title
    res.send(str)
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
    console.log();
    var query = {}
    if(req.query.category)
        query.category = req.query.category
    console.log(query);
    
    Book.find(query,function(err,docs){
        if(err)
            console.log("error",err);
            
        console.log(docs);
        options.books = docs
        
        return res.send(JSON.stringify(docs))  
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
            return res.redirect('/student');
        }
        if(!user){
            req.session.error = "Invalid credentials"
            console.log("[ERROR] Invalid User Credentials");
            return res.redirect('/student');
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
    serveStudentHome,
    serveStudentInfo,
    serveStudentSearch,
    searchBook,
    serveStudentBrowser,
    serveStudentProfile,
    serveRegisterPage,
    registerStudent,
    loginStudent,
    logoutStudent,
    StudentBrowserFilter
}