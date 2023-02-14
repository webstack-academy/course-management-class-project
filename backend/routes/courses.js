const express = require('express')
const courseController = require('../controllers/courses')
const router = express.Router()

router.post('/',courseController.create )


module.exports = router