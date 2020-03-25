/**
 * Types used to dispatch actions between Context/State/Reducer components 
 */
const actionTypes = {

  GET_CONTACTS: 'GET_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT', 
  SET_SELECTED_CONTACT: 'SET_SELECTED_CONTACT', 
  CLEAR_SELECTED_CONTACT: 'CLEAR_SELECTED_CONTACT',  
  CLEAR_CONTACTS: 'CLEAR_CONTACTS',  
  CONTACT_ERROR: 'CONTACT_ERROR', 

  REGISTER_USER: 'REGISTER_USER', 
  LOGIN_USER: 'LOGIN_USER', 
  LOGIN_SUCCESS: 'LOGIN_SUCCESS', 
  USER_LOADED: 'USER_LOADED',  
  

  REGISTER_FAIL: 'REGISTER_FAIL',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
 
  SET_ALERT: 'SET_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',

  SET_LOADING: 'SET_LOADING' 
   
};

/**
 *  Types and display values for Contact type
 */
const contactTypes = {
  PERSONAL: 'Personal', 
  PROFESSIONAL: 'Professional'
};



module.exports = {
  "actionTypes" : actionTypes, 
  "contactTypes" : contactTypes
}
