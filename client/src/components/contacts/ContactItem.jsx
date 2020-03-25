import React, { useContext } from 'react'; 
// import PropTypes from 'prop-types';
import  ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({contact}) => {

  const contactContext = useContext(ContactContext);  
  // const { contacts, loading, getContacts } = contactContext;

  function setSelectedContact(event) {
    console.log('ContactItem, calling contactContext.setSelectedContact()');
    contactContext.setSelectedContact(contact);
  };

  function deleteContact(event) {
    console.log('ContactItem, calling contactContext.deleteContact()');
    contactContext.deleteContact(contact);
  };

  return (
    <div className='card bg-light m-1'>
      <h3 className='text-primary text-left'> 
        {contact.name}  
        <span style={{float: 'right'}} className='badge badge-light'>{contact.type}</span> 
      </h3>
      <ul className='list'>
        <li> <i className='fas fa-envelope'/>{' '}{contact.email}   </li> 
        <li> <i className='fas fa-phone-square-alt'/>{' '} {contact.phone}  </li> 
        <li>
          <button className='btn btn-sm btn-primary' onClick={setSelectedContact}>Edit</button>
          <button className='btn btn-sm btn-danger' onClick={deleteContact} >Delete</button> 
        </li> 
      </ul>
   
    </div>
  )
}

 

export default ContactItem; 
