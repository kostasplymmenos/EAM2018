var express = require('express');
var router = express.Router();
const publisherController = require('../controllers/publisherController.js')

router.get("/publisher",publisherController.servePublisherHome)

router.get("/publisher/info",publisherController.servePublisherInfo)

router.get("/publisher/search",publisherController.servePublisherSearch)

router.get("/publisher/search/book",publisherController.searchBook)

module.exports = router;
