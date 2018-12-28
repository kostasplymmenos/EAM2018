var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",studentController)

router.get("/student/search",(req,res) => {
    res.render('./../views/search.ejs')
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