var express = require('express');
var router = express.Router();
const publisherController = require('../controllers/publisherController.js')

router.get("/publisher",(req,res)=> {
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherHome.ejs',{options:options})
})

router.get("/publisher/info",(req,res) => {
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherInfo.ejs',{options:options})
})

router.get("/publisher/search",(req,res) => {
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherSearch.ejs',{options:options})
})

router.get("/publisher/search/book",(req,res) => {
    var str = 'You amde a query for book with '
    if(req.query.author)
        str += "author " + req.query.author
    if(req.query.title)
        str += "title " + req.query.title
    res.send(str)
})

module.exports = router;
