const jwt = require('jsonwebtoken');
const config = require('config');
const Contact = require('../models/Contact');

const disableAuth = false; 

const checkReqAuth = (req, res, next) => {

  // for debugging purposes, disable authorization checking
  if (disableAuth) {
    checkReqAuth_Mokup (req, res, next); 
    return; 
  }; 
 
  // authentication checking 
  const jwtToken = req.header('x-auth-token');
  if (! jwtToken) {
    res.status(401).json({"msg": "Authorization token not found. Access denied."});
    return; 
  };  
  jwt_secret = config.get('jwt_secret'); 
  if (! jwt_secret) {
    res.status(500).json({"msg": "Server error."});
  }
  try {
    const jwtToken_decoded = jwt.verify(jwtToken, jwt_secret);
    // add jwt as "user" property to request
    req.user = jwtToken_decoded.user; 
    // continue processing request with the next = main callback 
    next();
  } catch (error) {
    console.log('checkReqAuth, error: \n', error);
    res.status(401).json({"msg": "Authorization token not valid."});
  } 
}

const   checkReqAuth_Mokup = async (req, res, next) => {

  try {
      // get first user that has contacts
      let contact = await Contact.findOne(); 
      console.log ('>>>>>>>>> checkReqAuth_Mokup, contact found: ', contact);
      if (! contact)  { 
        return res.status(404).json({"msg": "checkReqAuth_Mokup, no contact found, req.user not awailable"});
      }
      let user4req = {"id": contact.user};  // let user4req = {"id": "5e66b391ac4da63f4875be25"}; 

      // set req.user property to that user 
      req.user = user4req; 
      // continue request processing with main Callback 
      next();  
  } catch (error) {
      res.status(500).json({"msg": error.message})
  }

 

 
}


module.exports = {
  "checkReqAuth": checkReqAuth
}