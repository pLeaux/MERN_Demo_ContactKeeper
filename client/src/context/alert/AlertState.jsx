import React, { useReducer }  from 'react';
import AlertContext from './AlertContext'; 
import AlertReducer from './AlertReducer';
import { actionTypes } from '../types'; 
import { v4 as uuidv4 } from 'uuid';
 


const AlertState = (props) => { 

  const initialState = [];

  const [state, dispatch ] = useReducer(AlertReducer, initialState);  

  const setAlert = (msg, type, timeout = 3000) => {
    console.log('AlertState.setAlert !');
    try {
      let alertId = uuidv4();
      console.log('AlertState.setAlert, id: ', alertId);
      dispatch({
        type: actionTypes.SET_ALERT,
        payload:  { msg: msg,  type: type, id: alertId }
      });  
      setTimeout( () => 
        dispatch ({
          type: actionTypes.REMOVE_ALERT,
          payload: alertId
        }),  
        timeout 
      );   
    } catch (error) {
      console.log('setState error: ', error.message);
    } 
  };

  return ( 
    <AlertContext.Provider 
      value = {{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
  
}; 

 

export default AlertState; 
