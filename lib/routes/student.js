var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",(req,res)=> {
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/studentHome.ejs',{options:options})
})

router.get("/student/info",(req,res) => {
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/infoStudent.ejs',{options:options})
})

router.get("/student/search",(req,res) => {
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/studentSearch.ejs',{options:options})
})

router.get("/student/search/book",(req,res) => {
    var str = 'You amde a query for book with '
    if(req.query.author)
        str += "author " + req.query.author
    if(req.query.title)
        str += "title " + req.query.title
    res.send(str)
})

module.exports = router;
