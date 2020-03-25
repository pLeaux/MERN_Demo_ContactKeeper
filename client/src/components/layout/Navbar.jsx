import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';  
import ContactContext from '../../context/contact/ContactContext'; 


export const Navbar = ({title, icon}) => {

  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const onLogout = (e) => { 
    authContext.logout(); 
    contactContext.clearContacts();
  }

  return (
    <div className='navbar bg-primary'> 
      <span><h3> <Link to='/'> <i className={icon} /> {title}  </Link></h3> </span>
      <ul> 
        { ! authContext.isAuthenticated  ?  
          <Fragment> 
            <li> <Link to='/login'> <i className='fas fa-sign-in-alt'/> Login </Link></li>
            <li> <Link to='/register'> <i className='fas fa-user-plus'/> Register </Link></li>
          </Fragment>
          :  
          <Fragment> 
            <li> <span className='text-navbar-info'> User: {authContext.user && authContext.user.name} </span>  </li>
            <li> <a href='#!' onClick={onLogout}> <i className='fas fa-sign-out-alt'/> Logout </a> </li>
          </Fragment>
        }
        <li> <Link to='/about'> About </Link> </li>
      </ul>
    </div>
  )
}

Navbar.defaultProps = {
  title : 'Contact Keeper Demo', 
  icon: 'fas fa-home' // 'fas fa-id-card-alt'
}


Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string.isRequired
}

export default Navbar; 
