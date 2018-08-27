const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/*', function(req, res){
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
});

module.exports = router