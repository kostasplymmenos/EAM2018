var express    = require('express');
var router = express.Router();
const homeController = require('../controllers/homeController')

//user's home page with his news feed
router.get("/",homeController.basicHome)


module.exports = router;