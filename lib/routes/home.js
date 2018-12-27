var express = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController.js')

//user's home page with his news feed
router.get("/",homeController)

module.exports = router;