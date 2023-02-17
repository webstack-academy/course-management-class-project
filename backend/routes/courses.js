const express = require('express')
const courseController = require('../controllers/courses')
const router = express.Router()
const auth = require('../middlewares/authentication')

router.post('/create', auth.verifyAuth, courseController.createCourse )
router.get('/all', courseController.getCourses)

module.exports = router