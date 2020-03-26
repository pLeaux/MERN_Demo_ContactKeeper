import React from 'react'

const About = () => {

  const course_link = 'https://www.udemy.com/course/modern-react-front-to-back';
  const github_link = 'https://github.com/pLeaux/MERN_Demo_ContactKeeper';

  return (
    <div> 
      <h2 className='text-primary m-2'>
        Contact Keeper (MERN Demo) 
      </h2>  
      <div className='pagetext'>
        <p>
          Application is based upon the course "React Front To Back" from Brad Traversy, that I took on Udemy 
          (<a href={course_link}> link </a>) 
        </p>
        <br/>
        <p>
          <h4>Usage</h4> 
        </p> 
        <ol>
          <li className='left-2'> At startup, Login form opens </li>
          <li className='left-2'> If you are not registered yet, select Register in the menu and fill in the form </li>
          <li className='left-2'> After successfull login, form opens, with the list of your existing Contacts on the right and input form on the left </li>
          <li className='left-2'> Form is self-explainatory, supported functions are: search/add/edit/delete contact </li>
        </ol>
        <br/>
        <p>
          <h4> Tech stack used (MERN)</h4> 
        </p> 
        <ul>
          <li className='left-2'> Server-side: Node.js with Express, MongoDB with Mongoose, JWT and hashed passwords for authentication and authorization</li>
          <li className='left-2'> Client-side: React with functional components and hooks and routing, with Context API for state management and JWT for authentication and authorization </li> 
        </ul>
        <br/>
        <p>
          <h4>Additional links</h4> 
        </p> 
        <ol>
          <li className='left-2'> Source code on GitHub: <a href={github_link}> {github_link} </a> </li> 
        </ol>
        <br/>
        <p>
          Leo P. 
        </p>
      </div> 
    </div>
  )
}

export default About;
