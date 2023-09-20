import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton/ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  const homeClick = (e) => {
    e.preventDefault();
    history.push('/');
  };

  const newSpot = (e) => {
    e.preventDefault();
    history.push('/spots/new');
  };

  return (
    <div>
      <div className='navigation'>
        <div className='logo-container' onClick={homeClick}>
          <img className='logo-img' src='https://res.cloudinary.com/djclmc80y/image/upload/v1687316945/airbnb_logo_skrvy1.png' alt="" />
          <span className='logo-name'>Vacation Spots</span>
        </div>
        <div className='right-side-container'>
          <div className='rent-spot-container' onClick={newSpot}>
            <div>Rent your home</div>
          </div>
          {isLoaded && (
          <div className='user-menu'>
            <ProfileButton className='menu' user={sessionUser} />
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
