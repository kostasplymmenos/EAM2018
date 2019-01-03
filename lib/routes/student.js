var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",studentController.serveStudentHome)

router.get("/student/info",studentController.serveStudentInfo)

router.get("/student/search",studentController.serveStudentSearch)

router.get("/student/search/book",studentController.searchBook)

module.exports = router;
