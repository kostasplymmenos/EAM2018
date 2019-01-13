var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",studentController.serveStudentHome)

router.get("/student/info",studentController.serveStudentInfo)

router.get("/student/search",studentController.serveStudentSearch)

router.get("/student/search/book",studentController.searchBook)

router.get("/student/browse",studentController.serveStudentBrowser)

router.get("/student/register",studentController.serveRegisterPage)

router.post("/student/register",studentController.registerStudent)

router.post("/student/login",studentController.loginStudent)

router.get("/student/logout",studentController.logoutStudent)

router.get("/student/profile",studentController.serveStudentProfile)

router.get("/student/browse/books",studentController.StudentBrowserFilter)

router.post("/student/registerBooks",studentController.registerBooks)

router.get("/student/history",studentController.serveBookSubmissionHistoryPage)

router.put("/student/update",studentController.updateStudent)

module.exports = router;
