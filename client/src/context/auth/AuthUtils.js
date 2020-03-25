// import React, { useContext } from 'react';  
import axios from 'axios';

 
export const setAuthToken = (token) => {
    // set auth token for authenticated user, for all future requests 
    console.log('setAuthToken, axios...[x-auth-token] : ',  token);
    if (token) {
      axios.defaults.headers.common['x-auth-token'] =  token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
}


 
