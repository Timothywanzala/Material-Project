// import React from 'react'
// import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const LoginView= (props) => {
  const { loggedIn } = props
  // const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later
  }

  return (
    <div className="mainContainer">
      <div className='titleContainer'>
        <div>Welcome!</div>
      </div>
    
      <div className='buttonContainer'>
        <input
          className='inputButton'
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        
      </div>
    </div>
  )
}
LoginView.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};
export default LoginView