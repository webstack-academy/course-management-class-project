const express = require('express')
const courseController = require('../controllers/courses')
const router = express.Router()

router.post('/create',courseController.create )


module.exports = router