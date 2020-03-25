import React, { useReducer } from 'react'; 
import axios  from 'axios';
import { actionTypes } from '../types';
import ContactContext  from './ContactContext';
import ContactReducer  from './ContactReducer'; 


const ContactState = (props) => {

  const initialState = {
    contacts: null,
    selectedContact: null, 
    loading: false,
    contacts_filtered: null
  }; 

  const [state, dispatch] = useReducer(ContactReducer, initialState);  
   
  const getContacts = async () => {
    try { 
      console.log('getContacts, before axios.get, axios.defaults.headers.common["x-auth-token"]:', axios.defaults.headers.common['x-auth-token']);
      setLoading();
      let res  = await axios.get('/api/contacts');
      console.log('getContacts, res.data: ', res.data);
      dispatch({
        type: actionTypes.GET_CONTACTS, 
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CONTACT_ERROR, 
        payload: error.message
      }); 
    }
  };

  const setLoading = () => {
    dispatch({
      type: actionTypes.SET_LOADING 
    }); 
  };

  const addContact = async (newContact) => {
    try {
      console.log('ContactState.addContact');
      setLoading();
      let res  = await axios.post('/api/contacts', newContact, {header: {"content-type": "application/json"}}); 
      console.log('ContactState.addContact, res.data: \n', res.data ? res.data : res); 
      dispatch({
        type: actionTypes.ADD_CONTACT, 
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CONTACT_ERROR, 
        payload: error.message
      }); 
    }
  }

  const setSelectedContact = (selectedContact) => {
    console.log('ContactState, setSelectedContact start !');
    setLoading();
    dispatch({
      type: actionTypes.SET_SELECTED_CONTACT, 
      payload: selectedContact
    });
  }

  const clearSelectedContact = () => {
    console.log('ContactState.clearSelectedContact');
    dispatch({
      type: actionTypes.CLEAR_SELECTED_CONTACT 
    });
  }



  const updateContact = async (newContact) => {
    try {
      console.log('ContactState.updateContact');
      setLoading();
      let res  = await axios.put(`/api/contacts/${newContact._id}`, newContact, {header: {"content-type": "application/json"}}); 
      console.log('ContactState.updateContact, res.data: \n', res.data ? res.data : res); 
      dispatch({
        type: actionTypes.UPDATE_CONTACT, 
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CONTACT_ERROR, 
        payload: error.message
      }); 
    }
  }
 
  const deleteContact = async (contact) => {
    try {
      console.log('ContactState.deleteContact');
      setLoading();
      await axios.delete(`/api/contacts/${contact._id}`);  
      dispatch({
        type: actionTypes.DELETE_CONTACT, 
        payload: contact
      });
    } catch (error) {
      dispatch({
        type: actionTypes.CONTACT_ERROR, 
        payload: error.message
      }); 
    }
  }


  const clearContacts = () => {
    console.log('ContactState.clearContacts');
    dispatch({
      type: actionTypes.CLEAR_CONTACTS 
    });
  }


  // returned Provider is used in App.js to wrap other tags with <ContactState>
  return (
    <ContactContext.Provider 
        value={{
          contacts: state.contacts,
          loading: state.loading, 
          selectedContact: state.selectedContact,
          getContacts, 
          addContact,
          updateContact,
          deleteContact,
          setSelectedContact,
          clearSelectedContact,
          clearContacts
        }}
    >
      {props.children}
    </ContactContext.Provider>
  );

}


export default ContactState;

