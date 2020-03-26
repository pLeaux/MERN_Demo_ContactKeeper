import React , { useReducer, useEffect, useContext } from 'react';  
import axios from 'axios';
import { actionTypes } from '../types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { setAuthToken } from './AuthUtils';
import AlertContext from '../alert/AlertContext';


const AuthState = props => {

  const initialState = {
    isAuthenticated: false, 
    token: localStorage.getItem('token'),
    loading: false, 
    user: {}
  }; 

  const [state, dispatch] = useReducer(AuthReducer, initialState);  

  const alertContext = useContext(AlertContext);

  useEffect(() => {
    console.log(`AuthState.useEffect, state.isAuthenticated:${state.isAuthenticated}, state.token:${state.token}`);
    // eslint-disable-next-line
  }, [state.isAuthenticated, state.token]); 

  const registerUser = async (newUser) => {
    try {
      setLoading();
      var res = await axios.post('/api/users', JSON.stringify(newUser), { headers: { "content-type": "application/json"} });
      console.log('registerUser, response: ', res);  
      dispatch({
        type: actionTypes.REGISTER_USER, 
        payload: res.data
      }) ; 
      loadUser();     
    } catch (error) {
      let errMsg = error.response ? error.response.data.msg: error.message;  
      dispatch({
        type: actionTypes.REGISTER_ERROR, 
        payload: errMsg
      }); 
      alertContext.setAlert(errMsg, 'danger');
    }
  } 

  // login registered user
  const login = async (formData) => {
    try {
      console.log('AuthState.login(), before axios.post, formData: \n', formData); 
      setLoading(); 
      var res = await axios.post('/api/auth', JSON.stringify(formData), {headers: {"Content-type": "application/json"}});
      console.log('AuthState.login(), res.data: \n', res.data);  
      dispatch({
        type: actionTypes.LOGIN_SUCCESS, 
        payload: res.data
      });      
      console.log('AuthState, after login, state: \n', state);  // state not refreshed !?!
      loadUser();
      
    } catch (error) {
      console.log('Login error : ', error);
      let errMsg = error.response ? error.response.data.msg: error.message;  
      dispatch({
        type: actionTypes.LOGIN_ERROR, 
        payload: errMsg
      }) 
      alertContext.setAlert(errMsg, 'danger');
    }
  }

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT 
    });  
  }

  // load logged-in user from server (by id from JWT) 
  const loadUser = async () => { 
    console.log('AuthState.loadUser start'); 
    setAuthToken(localStorage.getItem('token')); // "state.token" cannot be used here, because not up-to-date 
    try {
      setLoading();   
      var res = await axios.get('/api/auth', {headers: {"Content-type": "application/json"}});
      console.log('AuthState.loadUser, GET /api/auth res.data: \n', res.data); 
      dispatch({
        type: actionTypes.USER_LOADED, 
        payload: res.data
      });  
    } catch (error){      
        console.log('AuthState.login error:\n', error.message);
        dispatch({
          type: actionTypes.AUTH_ERROR, 
          payload: error.message
        }) 
    } 
  }

  const setLoading = () => {
    dispatch({
      type: actionTypes.SET_LOADING 
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token, 
        registerUser,
        login,
        logout,
        loadUser
      }}>
        {props.children}
      </AuthContext.Provider>
  ); 
} 
 
export default AuthState; 

