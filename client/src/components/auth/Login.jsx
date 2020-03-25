import React, { useState, useContext, useEffect } from 'react';
// import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login = (props) => {

  const authContext = useContext(AuthContext); 
  const alertContext = useContext(AlertContext);

  useEffect(() => {
    // redirect to Home if already authenicated 
    if (authContext.isAuthenticated) {
      props.history.push('/');
    }
  }, [authContext.isAuthenticated, props.history])

  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  })

  function doOnChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function doOnSubmit(e) {
    e.preventDefault(); 
    console.log('Login, submitting formData: ', JSON.stringify(formData));
    authContext.login(formData);
  }

  return (
    <div className='form-container'>
      <div className='form-group'> 
        <h3 className='text-primary'>Login</h3>
        <form onSubmit={doOnSubmit}>  
          <label htmlFor='email'>Email, fake</label>
          <input type='email' id='email' name='email' value={formData.email} onChange={doOnChange} />  
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value={formData.password} onChange={doOnChange} />   
          <button type='submit' className='btn btn-primary btn-sm'> Login </button>   
        </form> 
        <br/>
        <i> ... or register first (see About for help) </i>
      </div>
    </div>
  )
}

Login.propTypes = {

}

export default Login;

