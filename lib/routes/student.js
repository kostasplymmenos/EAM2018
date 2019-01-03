var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",studentController.serveStudentHome)

router.get("/student/info",studentController.serveStudentInfo)

router.get("/student/search",studentController.serveStudentSearch)

router.get("/student/search/book",studentController.searchBook)

router.get("/student/register",studentController.serveRegisterPage)

router.post("/student/register",studentController.registerStudent)

module.exports = router;
