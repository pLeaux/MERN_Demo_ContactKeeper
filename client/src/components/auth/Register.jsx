import React, { useContext, useState, useEffect } from 'react'; 
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Register = props => {

  const authContext = useContext(AuthContext); 
  const alertContext = useContext(AlertContext);

  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    password: '',
    password2: ''
  }); 

  useEffect(() => {
    // redirect to Home if already authenicated 
    if (authContext.isAuthenticated) {
      props.history.push('/');
    }
  }, [authContext.isAuthenticated, props.history])

 

  function doOnChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function doOnSubmit(e) {
    e.preventDefault(); 
    console.log('Submitting formData: ', JSON.stringify(formData));
    if (formData.name === '' || formData.email === '' || formData.password === '') {
      alertContext.setAlert('Please enter all fields','danger');
    } else if (formData.password !== formData.password2) {
      alertContext.setAlert('Passowords do not match','danger');
    } else {
      authContext.registerUser(formData);
    }       
  }

  return (  
    <div className='form-container'>
      <div className='form-group'> 
        <h3 className='text-primary'>Register</h3>
        <form onSubmit={doOnSubmit}>  
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' value={formData.name}  onChange={doOnChange} />
          <label htmlFor='name'>Email, fake</label>
          <input type='email' id='email' name='email' value={formData.email}  onChange={doOnChange} />  
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value={formData.password}  onChange={doOnChange} /> 
          <label htmlFor='password2'>Password, repeated</label>
          <input type='password' name='password2' value={formData.password2} onChange={doOnChange} /> 
          <button type='submit' className='btn btn-primary btn-sm'> Register </button>  
        </form> 
      </div>
    </div> 
  )
}

Register.propTypes = {

};

export default Register;
