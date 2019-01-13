var express = require('express');
var router = express.Router();
const publisherController = require('../controllers/publisherController.js')

router.get("/publisher",publisherController.servePublisherHome)

router.get("/publisher/info",publisherController.servePublisherInfo)

router.get("/publisher/search",publisherController.servePublisherSearch)

router.get("/publisher/search/book",publisherController.searchBook)

router.get("/publisher/browse",publisherController.servePublisherBrowser)

router.get("/publisher/register",publisherController.serveRegisterPage)

router.get("/publisher/publish",publisherController.servePublishPage)

router.post("/publisher/publish",publisherController.publishBooks)

router.post("/publisher/register",publisherController.registerPublisher)

router.post("/publisher/login",publisherController.loginPublisher)

router.get("/publisher/logout",publisherController.logoutPublisher)

router.get("/publisher/profile",publisherController.servePublisherProfile)

router.get("/publisher/browse/books",publisherController.publisherBrowserFilter)

router.post("/publisher/publishBooks",publisherController.publishBooks)

// router.get("/student/history",publisherController.serveBookSubmissionHistoryPage)

module.exports = router;
