const express = require('express');
const router = express.Router(); 
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const { checkReqAuth } = require('../middleware/auth');

/**
 * @route:  GET api/contacts
 * @desc:   get logged-in user contacts
 * @access: private
 */ 
router.get('/', 
  checkReqAuth, 
  async (req, res) => { 
    try {
      // console.log('GET api/contacts, req: ', req);
      // get user id for logged user 
      const userId = req.user.id; 
      console.log('GET api/contacts, req.user.id: ', req.user.id);
      // get contacts for user 
      //  const contacts = await Contact.find({ "user": userId }); 
      const contacts = await Contact.find({ "user": userId }); 
      console.log('Contact.found: ', contacts);
      res.json(contacts); 
    } catch (error) {
      console.log('GET api/contacts, error: \n', error.message);
      res.status(500).json({"msg": "Server error."});
    } 
  }
) 
 
/**
 * @route:  POST api/contacts
 * @desc:   add new contact for logged-in user
 * @access: private
 */ 
router.post('/', 
  [
    check("name","Name is required").not().isEmpty() 
  ],
  checkReqAuth, 
  async (req, res) => { 
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ "errors": errors.array() });
      }
      const { name, email, phone, type } = req.body; 
      const userId = req.user.id; 
      let newContact = new Contact ({
        "user": userId,
        "name": name, 
        "email": email, 
        "phone": phone,
        "type": type
      }); 
      newContact = await newContact.save(); 
      res.json(newContact);
    } 
    catch (error) {
      console.log('POST api/contacts, unexpected error: ', error.message);
      res.status(500).json({ "msg": error.message });
    } 
  }
);

/**
 * @route:  PUT api/contacts/:id
 * @desc:   update logged-in user contacts
 * @access: private
 */ 
router.put(
  '/:id', 
  checkReqAuth,  
  async (req, res) => { 
    try {
      const userId = req.user.id; 
      const { user, name, email, phone, type } = req.body; 
      let contactInDb = await Contact.findById(req.params.id); 
      if (! contactInDb) {
        console.log(`PUT api/contacts/:id error:  Contact with _id=${req.param.id} not found.`) 
        res.status(404).json('Bad request. Contact not found'); 
        return;
      }; 
      if (userId != user.toString()) {
        console.log(`PUT api/contacts/:id error: userId(${userId}) !== user(${user.toString()})`) 
        res.status(401).json('Not authorized.'); 
        return;
      }; 

      if (name) 
        contactInDb.name = name; 
      if (name) 
        contactInDb.email = email; 
      if (name) 
        contactInDb.phone = phone;
      if (name) 
        contactInDb.type = type; 
      contactInDb = await contactInDb.save();  
      res.json(contactInDb);
    } 
    catch (error) {
      console.log('POST api/contacts, unexpected error: ', error.message);
      res.status(500).json({ "msg": error.message });
    } 
  }
); 

/**
 * @route:  DELETE api/contacts/:id
 * @desc:   get logged-in user contacts
 * @access: private
 */ 
router.delete(  
  '/:id', 
  checkReqAuth,  
  async (req, res) => { 
    try {
      const userId = req.user.id;   
      let contactInDb = await Contact.findById(req.params.id); 
      if (! contactInDb) {
        console.log(`DELETE api/contacts/:id error:  Contact with id=${req.param.id} not found.`) 
        res.status(404).json('Bad request. Contact not found'); 
        return;
      }; 
      if (userId != contactInDb.user.toString()) {
        console.log(`DELETE api/contacts/:id error: userId != user`) 
        res.status(401).json('Not authorized.'); 
        return;
      };  
      contactInDb = await contactInDb.deleteOne();
      res.json({"msg": "Contact deleted."});
    } 
    catch (error) {
      console.log('DELETE api/contacts, unexpected error: ', error.message);
      res.status(500).json({ "msg": error.message });
    } 
});


module.exports = router;