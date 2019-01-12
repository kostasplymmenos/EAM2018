var express = require('express');
var router = express.Router();
const publisherController = require('../controllers/publisherController.js')

router.get("/publisher",publisherController.servePublisherHome)

router.get("/publisher/info",publisherController.servePublisherInfo)

router.get("/publisher/search",publisherController.servePublisherSearch)

router.get("/publisher/search/book",publisherController.searchBook)

router.get("/publisher/browse",publisherController.servePublisherBrowser)

router.get("/publisher/register",publisherController.serveRegisterPage)

/*router.post("/student/register",studentController.registerStudent)

router.post("/student/login",studentController.loginStudent)

router.get("/student/logout",studentController.logoutStudent)

router.get("/student/profile",studentController.serveStudentProfile)

router.get("/student/browse/books",studentController.StudentBrowserFilter)

router.post("/student/registerBooks",studentController.registerBooks)

router.get("/student/history",studentController.serveBookSubmissionHistoryPage)*/

module.exports = router;
