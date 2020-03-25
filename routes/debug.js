/**
 *  Modul is intended only for debugging during development and is not part of the application 
 *  (added by Leo P., doesn't exist in original project)
 */

const express = require('express');
const router = express.Router(); 
const db = require('../config/db');  
const { encrypt, compareWithHash } = require('../utils/utils');
const mongoose = require('mongoose');
const User = require('../models/User');
const { checkReqAuth } = require('../middleware/auth'); 
const config  = require('config');
const jwt = require('jsonwebtoken');


/**
 * @route:  GET api/debug
 * @desc:   debugging, check if api/debug route is accessable
 * @access: public (upon development)
 */ 
router.get('/', 
  (req, res) => {    
    res.send('/debug works!');
  }
);
 


/**
 * @route:  GET api/debug/checkdb
 * @desc:   debugging, check db connection
 * @access: public (upon development)
 */ 
router.get('/checkdb',  
  (req, res) => {  
    if (db.dbConnection && (db.dbConnection.readyState===1)) { 
      res.send ('Database connection has been established! Database '+ db.dbConnection.name);
    } else {
      res.send ('Error, no database connection!'); 
    } 
  }  
);


/**
 * @route:  GET api/debug/returnRequestBody
 * @desc:   debugging, check for "body-parser", returns data, sent in request body 
 * @access: public (upon development)
 */ 
router.post('/returnRequestBody',  
  (req, res) => {  
    if (req.body) { 
      res.send (req.body);
    } else {
      console.log('returnRequestBody, Request: \n\n', req);
      res.send ('Error, no data in req.body'); 
    } 
  }  
);

/**
 * @route:  GET api/debug/checkUserPwd/:userEmail/:plainTextPwd
 * @desc:   debugging, check plainTextPwd against the user's hashed password, saved in DB  
 * @access: public (upon development)
 */ 
router.get('/checkUserPwd/:userEmail/:plainTextPwd',  
  async (req, res) => {  
    console.log('./debug/checkUserPwd');
    try {
      let userEmail = req.params.userEmail; 
      let plainTextPwd = req.params.plainTextPwd;
      console.log(`Debug/checkUserPwd, userEmail=${userEmail}, plainTextPwd=${plainTextPwd}`); 
      let userInDb = await User.findOne({"email": userEmail}, (err) => { console.log('User.findOne error: \n', err) });
      if (! userInDb) {
        res.send(`User with email "${userEmail}" does not exist!`);
        return;
      }
      if (await compareWithHash(plainTextPwd, userInDb.password)) {
        res.send('Passwords match!');
      } else {
        res.send('Passwords DO NOT match!');
      } 
    } catch (error) {
      res.status(500).send('checkUserPwd: \n'+ error.message);
    }
 
  }  
);

/**
 * @route:  GET api/checkAuth
 * @desc:   debugging, check JWT authorization   
 * @access: public (upon development)
 */ 
router.get('/checkAuth', checkReqAuth,  async (req, res) => { 

  res.send('Response from /debug/checkAuth');
});


/**
 * @route:   GET api/debug/getJwtForUser/:userEmail
 * @desc:    debugging, check plainTextPwd against the user's hashed password, saved in DB  
 * @access:  public (upon development)
 * @usage:   1.create token for user with URL like "http://localhost:5000/api/debug/getJwtForUser/mojca.novak@novak.si"
 *           2.in Postman: create GET request "../getJwtForUser/mojca.novak@novk.si", add key "x-auth-token" = <created token>
 */ 
router.get('/getJwtForUser/:userEmail',    
  async (req, res) => {  
    try {
      let userEmail = req.params.userEmail; 
      let userInDb = await User.findOne({"email": userEmail});  
      if (! userInDb) { 
        res.status(404).json({ "msg": `User with email ${userEmail} does not exist`});
        return;
      };   
      // create JWT token:  
      const jwt_secret = config.get('jwt_secret');
      const jwt_data = {"user": {"id": userInDb.id} };
      jwToken = jwt.sign(jwt_data, jwt_secret, {expiresIn: 6000 /*sec*/ }); // returns base64 string, that can be unpacked with "www.jwt.io" or jwt.verify()  
      res.status(201).send(`User ${userEmail}, created JWT: \n ${jwToken}`); 
    } catch (error) { 
      res.status(500).send('Debug/getJwtForUser, unexpected error: \n'+ error.message); 
    }  
  }
) 

module.exports = router;

