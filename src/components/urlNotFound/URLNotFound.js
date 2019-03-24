import React from 'react';
import { Link } from 'react-router-dom';
import './URLNotFound.css';

const URLNotFound = (props) => {
  return (
    <div className='error-container'>
      <p className='error-message'>URL not Found</p>
      <Link to='/' className='return-link'> Go back home</Link>
    </div>
  )
};

export default URLNotFound;
