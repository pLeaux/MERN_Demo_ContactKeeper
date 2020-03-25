import React, { useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/AlertContext';


const Alerts = () => {

  const alertContext = useContext(AlertContext); 

  useEffect(() => {
    console.log('Alerts.useEffect, alertContext.alerts changed: ', alertContext.alerts); 
  }, [alertContext.alerts])

  // return(<div> ALERTS !!!</div> ); 
 
  if (alertContext.alerts.length > 0) 
    return ( 
      <Fragment> {
        alertContext.alerts.length > 0 
        ?  alertContext.alerts.map ( alert => (<div key={alert.id} className={`alert alert-${alert.type}`}> {alert.msg} </div> )) 
        : ''
      } 
      </Fragment> 
    )
  else 
    return(null);
 

}

export default Alerts;
