const express = require('express');
const router = express.Router(); 
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
// const { bcrypt } = require('bcryptjs');
const { encrypt, compareWithHash } = require('../utils/utils.js');
const config = require('config');
const jwt = require('jsonwebtoken');
  
 
/**
 * @route:  GET api/users
 * @desc:   just basic test for routing 
 * @access: public
 */ 
router.get('/', 
  (req, res) => { 
    res.send('TEST: msg returned from "users.js" GET');
  }
) 

/**
 * @route:  POST api/users
 * @desc:   register new user 
 * @access: public
 */ 
router.post(
  '/', 
  [ // checks of input data, just for example + these checks are definition and not yet execution
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password','Bad password, min.length is 5.').isLength({min: 5})
  ],   
  async (req, res) => { 
    console.log('>>>>>>>>>>> POST api/users, req.body: \n\n', req.body); 
    const vResult = validationResult(req);  
    if (! vResult.isEmpty() && vResult.errors) { 
      res.status(400).json({ "msg": vResult.errors.map(err => err.msg).join('; ')}); 
      return;
    };  
    const { name, email, password } = req.body; 
    try {
      let userInDb = await User.findOne({"email": email});  
      if (userInDb) {
        console.log('userInDb: \n\n', userInDb);
        res.status(400).json({ "msg": `User with email ${email} already exists`});
        return;
      }; 
      userInDb = new User ({
        "name": name,
        "email": email,
        "password": await encrypt(password)
      });  
      await userInDb.save();
      res.body = JSON.stringify(userInDb); 

      // create JWT token:  
      const jwt_secret = config.get('jwt_secret');
      const jwt_data = {"user": {"id": userInDb.id} };
      jwToken = jwt.sign(jwt_data, jwt_secret, {expiresIn: 36000 /*sec*/ }); // returns base64 string, that can be unpacked with "www.jwt.io"  
      // res.status(201).send(`User ${name} created. \n JWT: \n ${jwToken}`); 
      res.status(201).json({token: jwToken}); 
    } catch (error) {
      console.log('POST api/users, unexpected error: \n', error.message);
      res.status(500).json({ "msg": 'Server error'});
      return;
    }  
  }
) 

module.exports = router;