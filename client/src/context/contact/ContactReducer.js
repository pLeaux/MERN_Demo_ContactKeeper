// import React from 'react';
import { actionTypes } from '../types';

const ContactReducer = function (state, action) {

  console.log('ContactReducer START, action: \n', action.type);

  let newState = {};

  switch (action.type) {
    case actionTypes.GET_CONTACTS: {
      newState = {
        ...state,
        contacts: action.payload, 
        loading: false
      }; 
      return(newState);
    }
    case actionTypes.ADD_CONTACT: {
      newState = {
        ...state,
        contacts: [...state.contacts, action.payload], 
        loading: false
      }; 
      return(newState);
    }
    case actionTypes.UPDATE_CONTACT: {
      newState = {
        ...state,
        contacts: state.contacts.map((contact) => contact._id === action.payload._id ? action.payload : contact), 
        loading: false
      }; 
      return(newState);
    }
    case actionTypes.DELETE_CONTACT: {
      newState = {
        ...state,
        contacts: state.contacts.filter((contact) => contact._id !== action.payload._id), 
        loading: false
      }; 
      return(newState);
    }
    case actionTypes.SET_SELECTED_CONTACT: {
      newState = {
        ...state,
        selectedContact: action.payload, 
        loading: false
      };  
      return(newState);
    }
    case actionTypes.CLEAR_SELECTED_CONTACT: {
      newState = {
        ...state,
        selectedContact: null, 
        loading: false
      };  
      return(newState);
    }
    case actionTypes.CLEAR_CONTACTS: {
      newState = {
        ...state,
        selectedContact: null, 
        contacts: null,  
        loading: false
      };  
      return(newState);
    }
    case actionTypes.SET_LOADING: {
      newState = {
        ...state, 
        loading: true
      }; 
      return(newState);
    }
    default: {
      return (state); 
    }
  }  
}

export default ContactReducer;

