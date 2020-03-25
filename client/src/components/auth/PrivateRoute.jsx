import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

/**
 *  Wrapper for <Route> component and it's content (see React docs: "Higher-Order Components"); 
 *  Generically redirects any route to "/login", if user is not authenticated
 *  Usage in App.js: instead of "<Route><Home/></Route>", use "<PrivateRoute><Home/></PrivateRoute>" 
 */
 
/** 
 *  My version (easier to understand the logic)
 */
const PrivateRoute = (props) => { 
  console.log('PrivateRoute, props: \n', props); 
  const authContext = useContext(AuthContext);
  const { children, path, ...restProps} = props;
  if (authContext.isAuthenticated ) {
    return (
      <Route path={path} {...restProps}>
          {children}
      </Route>  
    )
  } else {
    console.log('PrivateRoute, redirect to /login');
    return (
      <Redirect to='/login'/> 
    )
  }
 
}

/**
 *  Backup, version Brad Traversy 
 * 
---------------------------------
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
----------------------------------
*/



export default PrivateRoute;

