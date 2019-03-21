import React from 'react';
import PropTypes from 'prop-types';

const Temperature = (props) => {
  const { temp, farenheit, handleClick, className } = props;
  const celsiusTherm = '/images/thermometer-C.png';
  const farenheitTherm = '/images/thermometer-F.png';
  const click = () => {
    handleClick()
  };
  return(
    <div className='temp-container'>
      <img src={(farenheit)? farenheitTherm : celsiusTherm} alt='thermometer'/>
      <p className={className} onClick={click}>
        {(farenheit) 
          ? Math.round(1.8 * (temp - 273) + 32)
          : Math.round(temp - 273)
        }
      </p>
    </div>
  )
};

Temperature.propTypes = {
  temp: PropTypes.number.isRequired,
  farenheit: PropTypes.bool.isRequired,
  handleClick: PropTypes.func,
  containerClassName: PropTypes.string.isRequired,
  pClassName: PropTypes.string.isRequired,
};

export default Temperature;
