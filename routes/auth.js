const express = require('express');
const router = express.Router(); 
const config  = require('config');

const { checkReqAuth } = require('../middleware/auth'); 
const { check, validationResult } = require('express-validator');
const { encrypt, compareWithHash } = require('../utils/utils');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
 
/*
const db = require('../config/db');   
const mongoose = require('mongoose'); 
  
*/ 


/**
 * @route:  GET api/auth
 * @desc:   get logged-in user 
 * @access: public
 */ 
router.get('/', checkReqAuth, async (req, res) => { 
    try {
        if (! (req.user && req.user.id) ) {
            console.log('GET api/auth, req.user.id is null; req.user/req: \n', req.user ? req.user : req);
            res.status(500).json({"msg": "Server error."});
            return; 
        };
        let userInDb = await User.findById(req.user.id).select('-password');
        // console.log('GET api/auth, userInDb, userInDb: ', userInDb)
        if (! userInDb) {
            res.status(400).json({"msg": "User not found."});
            return; 
        };
        res.json(userInDb); 
    } catch (err) {
        console.log('GET api/auth, unsexpected error: \n', err.message);
        res.status(500).json({"msg": "Server error."});
    } 
});

/**
 * @route:  POST api/auth
 * @desc:   login registered user and return JWT (req.body = {email, password})
 * @access: public
 */ 
router.post(
    '/', 
    // check data, sent in request 
    [
        check('email','No email in request.').not().isEmpty(), 
        check('email','Bad email format.').isEmail(), 
        check('password','Unvalid password (min.length=5).').isLength({min: 5})
    ],  
    async (req, res) => { 
        try {
            console.log('>>>>>>>>>>> POST api/auth'); 
            // check data, sent in request
            const errors = validationResult(req); 
            if (! errors.isEmpty()) {
              res.status(400).json({ "errors": errors.array()} );
              return;
            };  
            // check password 
            const { email, password } = req.body; 
            const userInDb = await User.findOne({ "email": email });
            if (! userInDb) {
                res.status(400).json( {"msg": `User with email ${email} does not exist`});
                return; 
            };
            if (! await compareWithHash(password, userInDb.password)) {
                res.status(400).json( {"msg": `Bad password`});
                return; 
            };  
            // create and return JWT 
            const jwt_secret = config.get('jwt_secret');
            const jwt_data = {"user": {"id": userInDb.id} };
            jwToken = jwt.sign(jwt_data, jwt_secret, {expiresIn: 36000 /*sec*/ }); // returns base64 string, that can be unpacked with "www.jwt.io" or jwt.verify()  
            res.status(201).json({ "token": jwToken }); 
        } catch (error) {
            console.log('POST api/auth error: \n', error.message);
            res.status(500).json({ "msg": "Server error" });
        } 
    }
);

module.exports = router; 
