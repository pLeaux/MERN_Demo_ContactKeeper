// import React from 'react'; 
// import PropTypes from 'prop-types';
import { actionTypes } from '../types'; 

const AuthReducer = (state, action) => {

  console.log('AuthReducer START, action: \n', action.type);
   
  let newState = {};

  switch (action.type) {
     
    case actionTypes.REGISTER_USER: {
      localStorage.setItem('token', action.payload.token);
      newState = {
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        loading: false 
      };
      return(newState);
    }
    case actionTypes.LOGIN_SUCCESS: {
      localStorage.setItem('token', action.payload.token); // looks like "state.token" does not syncronize immediatelly 
      newState = {
        ...state,  
        isAuthenticated: true, 
        // token: action.payload.token,
        loading: false 
      };
      return(newState);
    } 
    case actionTypes.USER_LOADED: {
      localStorage.removeItem('token');
      newState = {
        ...state,  
        isAuthenticated: true, 
        user: action.payload, 
        loading: false 
      };
      return(newState);
    }
    case actionTypes.REGISTER_FAIL:
    case actionTypes.AUTH_ERROR:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT: {
      localStorage.removeItem('token');
      newState = {
        ...state,  
        isAuthenticated: false, 
        token: null,
        user: null,
        loading: false 
      };
      return(newState);
    }
    default: {
      return(state);
    }
    
  }

}

AuthReducer.propTypes = {

}

export default AuthReducer; 
