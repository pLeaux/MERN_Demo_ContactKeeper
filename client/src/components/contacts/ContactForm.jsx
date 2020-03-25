import React, { useState, useContext, useEffect } from 'react';
import { contactTypes } from '../../context/types';
import ContactContext from '../../context/contact/ContactContext';  
 

const ContactForm = () => {

  const contactContext = useContext(ContactContext);  

  useEffect (() => {
    if (contactContext.selectedContact) {
      setContact(contactContext.selectedContact)
    } else {
      setContact({
        name: '', 
        email: '', 
        phone: '', 
        type: contactTypes.PERSONAL 
      });        
    }
  }, [contactContext.selectedContact] );

  const [contact, setContact] = useState({
    name: '', 
    email: '', 
    phone: '', 
    type: null
  });


  const onSubmit = (event) => {
    event.preventDefault();
    if (contactContext.selectedContact) {
      contactContext.updateContact(contact);
    } else {
      contactContext.addContact(contact);
    };  
    contactContext.clearSelectedContact();
  }

  const onChange = (event) => {
    setContact({...contact, [event.target.name]: event.target.value});
  }
  

  return (
    <form> 
      <h3> {contactContext.selectedContact ? 'Edit Contact:' : 'Add Contact:'} </h3> 
      <div className='card  m-1'>
        <input name='name' type='text' placeholder='<Name>' value={contact.name} onChange={onChange}/>
        <input name='email' type='email' placeholder='<Email>' value={contact.email} onChange={onChange}/>
        <input name='phone' type='text' placeholder='<Phone>' value={contact.phone} onChange={onChange}/>   
        <span>
          <input type='radio' name='type' value={contactTypes.PERSONAL} checked={contact.type===contactTypes.PERSONAL} onChange={onChange}/> {' '+ contactTypes.PERSONAL+'  '}
          <input type='radio' name='type' value={contactTypes.PROFESSIONAL} checked={contact.type===contactTypes.PROFESSIONAL} onChange={onChange}/> {' '+ contactTypes.PROFESSIONAL +'  '}
        </span> 
        <p>
          <input type='submit' value={contactContext.selectedContact ? 'Update Contact' : 'Add Contact'}  onClick={onSubmit} className='btn btn-primary'/>
        </p> 
      </div>
      {/* 
      <div className='m-1 form-text'>
        <p> Debug, contact:</p> 
        <textarea rows="4" cols="50" value={JSON.stringify(contact)} readOnly  /> 
      </div> 
      */}
    </form>
 
  )
}

export default ContactForm;
