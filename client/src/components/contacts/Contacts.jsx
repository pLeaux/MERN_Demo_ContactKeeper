import React, { useContext, useEffect, useState } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem'; 
 


const Contacts = () => {

  const contactContext = useContext(ContactContext);
  // console.log('contactContext: \n', contactContext);  
  const { contacts, getContacts } = contactContext;

  var [filter, setFilter] = useState (''); 

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const onFilterChange = (e) => {
    setFilter (e.target.value) ; 
  }

  return (
    <div> 
      <h3> Contacts: </h3>  
      <div className='m-1'>
        <input name='filterInput' type='text' placeholder='<Filter by Name or Email>' value={filter} onChange={onFilterChange}/>
      </div> 
      <div>  
        { (contacts !== null) ? ( 
            (filter === '') ? (
              (contacts.map(oneContact => (<ContactItem key={oneContact._id} contact={oneContact} />))) 
            ) : (
              contacts
              .filter(oneContact => oneContact.name.toLowerCase().includes(filter.toLowerCase()) ||  oneContact.email.toLowerCase().includes(filter.toLowerCase()))
              .map((oneContact) => (<ContactItem key={oneContact._id} contact={oneContact} />))
            ) 
          ) : (
            '... no contacts yet ...'
          )  
        }
      </div> 
    </div>
  );
}

export default Contacts;
