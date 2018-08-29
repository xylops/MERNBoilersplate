const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
});


router.get('/login', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
});

router.get('/dashboard', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
});

module.exports = router