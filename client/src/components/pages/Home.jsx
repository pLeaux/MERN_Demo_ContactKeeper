import React, { useContext, useEffect } from 'react';
import Contacts from '../../components/contacts/Contacts';
import ContactForm from '../../components/contacts/ContactForm';  

export const Home = (props) => { 

  return (
    <div className='grid-2'>
      <ContactForm/>
      <Contacts/>
    </div>
  )
};

export default Home; 

 