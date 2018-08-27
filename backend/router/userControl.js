const express = require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt    = require('jsonwebtoken');
const { UserModel } = require('../model')
const logger = require('../service/logger')

router.post('/register', async (req, res) => {
    let { id, pw, pw2 } = req.body;

    if (pw !== pw2 || _.isEmpty(pw)) { return res.status(400).json('invalid password');}

    let userExist = await UserModel.findOne({username: id}) !== null;
    if(userExist){ return res.status(400).json({ errMsg: 'User Existed' });}

    try {
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(pw, salt)
        var newUser = new UserModel({
            username: id,
            password: hash,
            permission: 'entry'
        });
        await newUser.save();
        return res.status(200).json({ success: true });
    } catch(err) {
        logger.error(err)
        return res.status(500).json({ errMsg: 'Create User Fail' });
    }
});

router.post('/login', async(req, res) => {
    let { id, pw } = req.body

    try {
        let user = await UserModel.findOne({ username: id }).select('username').select('password');
        if (user === null) { return res.status(401).json({ errMsg: 'Unauthenticated'});}
        let passwordMatch = await bcrypt.compare(pw, user.password);
        if(!passwordMatch){ return res.status(401).json({ success: false, errMsg: 'Unauthenticated'}); }
        let payload = {
            userInfo: {
                name: user.username,
                _id: user._id
            }
        }
        let jwtOptions = {
            algorithm: 'HS256',
            // expiresIn: keys.jwtExpiredIn,
        }
        let token = jwt.sign( payload, process.env.jwtSecret, jwtOptions );
        await UserModel.findOneAndUpdate({ _id: user._id }, { $set: { token } }, { upsert: true });
        return res
                .status(200)
                .cookie('token',token, { maxAge: 10 * 60 * 60 * 1000 , httpOnly: true })
                .send('success');
    } catch(err) {
        logger.error(err)
        return res.status(500).json({ success: false, errMsg: 'Server error' });
    }
})

module.exports = router