import React from 'react'; 
import './App.css';  
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/auth/PrivateRoute';

 

function App() {
 
  return (
    <AlertState> 
      <AuthState>  
        <ContactState>  
            <Router> 
              <Navbar/>  
              <Alerts/> 
              <div className='container'> 
                <Switch> 
                  <PrivateRoute exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/login' component={Login}/> 
                  <Route exact path='/register' component={Register}/>   
                </Switch> 
              </div>
            </Router>  
        </ContactState>  
      </AuthState>
    </AlertState> 
  );
}

export default App;
