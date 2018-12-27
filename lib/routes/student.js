var express = require('express');
var router = express.Router();
const studentController = require('../controllers/studentController.js')

router.get("/student",studentController)

module.exports = router;