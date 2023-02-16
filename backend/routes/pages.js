const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/create', (req, res) => {
    res.render('createCourse')
})

router.get('/home', (req, res) => {
    res.render('home')
})


module.exports = router