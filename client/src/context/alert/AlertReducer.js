import React, { useContext } from 'react'; 
import AlertContext from './AlertContext';
import { actionTypes } from '../types';

const AlertReducer = (state, action) => {

  const alertContext = useContext(AlertContext); 
  var newState = [];

  console.log('AlertReducer, action.type: ', action.type); 

  switch (action.type) { 
    case actionTypes.SET_ALERT: {
      console.log('AlertReducer.SET_ALERT');
      newState = [...state, action.payload];
      console.log('AlertReducer.SET_ALERT, newState: ', newState); 
      return(newState);
    }
    case actionTypes.REMOVE_ALERT: {
      newState = state.filter(alert => alert.id !== action.payload);
      return(newState);
    }
    default: {
      return(state);
    }
  } 
 
}

export default AlertReducer; 
