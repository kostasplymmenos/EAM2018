const User = require('../../models/user.js')
const Book = require('../../models/book.js')
const passport = require('passport')
const mongoose = require('mongoose')
const express = require('express')
var bodyParser = require("body-parser");

var router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

var options = {};

function servePublisherHome(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherHome.ejs',{options:options})
}

function servePublisherInfo(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherInfo.ejs',{options:options})
}

function servePublisherSearch(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherSearch.ejs',{options:options})
}

function searchBook(req,res){
    var str = 'You amde a query for book with '
    if(req.query.author)
        str += "author " + req.query.author
    if(req.query.title)
        str += "title " + req.query.title
    res.send(str)
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

module.exports = {
    servePublisherHome,
    servePublisherInfo,
    servePublisherSearch,
    servePublisherBrowser,
    serveRegisterPage,
    searchBook
}